import { Router } from "express";
import { db } from "../db";

export const reservasRouter = Router();

reservasRouter.get("/", (req, res) => {
    const reservas = db
        .prepare(`
            SELECT reservas.*, quartos.numero AS quarto_numero, hospedes.nome AS hospede_nome
            FROM reservas
            JOIN quartos ON quartos.id = reservas.quarto_id
            JOIN hospedes ON hospedes.id = reservas.hospede_id
        `)
        .all();

    res.json(reservas);
});

reservasRouter.post("/", (req, res) => {
    const { quarto_id, hospede_id, data_checkin } = req.body;

    if (!quarto_id || !hospede_id || !data_checkin) {
        return res.status(400).json({ error: "Informe quarto, hóspede e data de check-in" });
    }

    const conflito = db
        .prepare(`
            SELECT id FROM reservas
            WHERE quarto_id = ? AND data_checkin = ? AND status != 'Finalizado'
        `)
        .get(quarto_id, data_checkin);

    if (conflito) {
        return res.status(400).json({ error: "Já existe uma reserva para esse quarto nessa data" });
    }

    const result = db
        .prepare(`
            INSERT INTO reservas (quarto_id, hospede_id, data_checkin, status)
            VALUES (?, ?, ?, 'Reservado')
        `)
        .run(quarto_id, hospede_id, data_checkin);

    res.status(201).json({ id: result.lastInsertRowid, status: "Reservado" });
});

reservasRouter.post("/:id/checkin", (req, res) => {
    const { id } = req.params;

    const reserva = db.prepare("SELECT * FROM reservas WHERE id = ?").get(id) as any;
    if (!reserva) {
        return res.status(404).json({ error: "Reserva não encontrada" });
    }

    if (reserva.status !== "Reservado") {
        return res.status(400).json({ error: "Essa reserva já teve o check-in realizado" });
    }

    const quarto = db.prepare("SELECT * FROM quartos WHERE id = ?").get(reserva.quarto_id) as any;

    if (quarto.status === "Limpeza Pendente") {
        return res.status(400).json({ error: "Quarto com limpeza pendente. Check-in não permitido." });
    }

    if (quarto.status === "Ocupado") {
        return res.status(400).json({ error: "Quarto já está ocupado por outro hóspede" });
    }

    db.prepare("UPDATE quartos SET status = 'Ocupado' WHERE id = ?").run(quarto.id);
    db.prepare("UPDATE reservas SET status = 'Em andamento' WHERE id = ?").run(id);

    res.json({ id, status: "Em andamento" });
});

reservasRouter.post("/:id/checkout", (req, res) => {
    const { id } = req.params;

    const reserva = db.prepare("SELECT * FROM reservas WHERE id = ?").get(id) as any;
    if (!reserva) {
        return res.status(404).json({ error: "Reserva não encontrada" });
    }

    db.prepare("UPDATE quartos SET status = 'Limpeza Pendente' WHERE id = ?").run(reserva.quarto_id);
    db.prepare("UPDATE reservas SET status = 'Finalizado' WHERE id = ?").run(id);

    res.json({ id, status: "Finalizado" });
});

reservasRouter.delete("/:id", (req, res) => {
    const { id } = req.params;

    const reserva = db.prepare("SELECT * FROM reservas WHERE id = ?").get(id) as any;
    if (!reserva) {
        return res.status(404).json({ error: "Reserva não encontrada" });
    }

    if (reserva.status === "Em andamento") {
        db.prepare("UPDATE quartos SET status = 'Livre' WHERE id = ?").run(reserva.quarto_id);
    }

    db.prepare("DELETE FROM reservas WHERE id = ?").run(id);
    res.status(204).send();
});
