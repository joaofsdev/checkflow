import { Router } from "express";
import { db } from "../db";

export const quartosRouter = Router();

quartosRouter.get("/", (req, res) => {
    const quartos = db.prepare("SELECT * FROM quartos").all();
    res.json(quartos);
});

quartosRouter.post("/", (req, res) => {
    const { numero, tipo } = req.body;

    if (!numero || !tipo) {
        return res.status(400).json({ error: "Informe número e tipo do quarto" });
    }

    const existente = db.prepare("SELECT id FROM quartos WHERE numero = ?").get(numero);
    if (existente) {
        return res.status(400).json({ error: "Já existe um quarto com esse número" });
    }

    const result = db
        .prepare("INSERT INTO quartos (numero, tipo, status) VALUES (?, ?, 'Livre')")
        .run(numero, tipo);

    res.status(201).json({ id: result.lastInsertRowid, numero, tipo, status: "Livre" });
});

quartosRouter.patch("/:id/limpeza", (req, res) => {
    const { id } = req.params;
    const quarto = db.prepare("SELECT * FROM quartos WHERE id = ?").get(id);

    if (!quarto) {
        return res.status(404).json({ error: "Quarto não encontrado" });
    }

    db.prepare("UPDATE quartos SET status = 'Livre' WHERE id = ?").run(id);
    res.json({ ...quarto, status: "Livre" });
});

quartosRouter.delete("/:id", (req, res) => {
    const { id } = req.params;

    const quarto = db.prepare("SELECT id FROM quartos WHERE id = ?").get(id);
    if (!quarto) {
        return res.status(404).json({ error: "Quarto não encontrado" });
    }

    const reservaVinculada = db.prepare("SELECT id FROM reservas WHERE quarto_id = ?").get(id);
    if (reservaVinculada) {
        return res.status(400).json({ error: "Este quarto possui reservas vinculadas e não pode ser excluído" });
    }

    db.prepare("DELETE FROM quartos WHERE id = ?").run(id);
    res.status(204).send();
});
