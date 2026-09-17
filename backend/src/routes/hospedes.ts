import { Router } from "express";
import { db } from "../db";

export const hospedesRouter = Router();

hospedesRouter.get("/", (req, res) => {
    const hospedes = db.prepare("SELECT * FROM hospedes").all();
    res.json(hospedes);
});

hospedesRouter.post("/", (req, res) => {
    const { nome, documento, telefone } = req.body;

    if (!nome || !documento) {
        return res.status(400).json({ error: "Informe nome e documento do hóspede" });
    }

    const existente = db.prepare("SELECT id FROM hospedes WHERE documento = ?").get(documento);
    if (existente) {
        return res.status(400).json({ error: "Já existe um hóspede cadastrado com esse documento" });
    }

    const result = db
        .prepare("INSERT INTO hospedes (nome, documento, telefone) VALUES (?, ?, ?)")
        .run(nome, documento, telefone ?? null);

    res.status(201).json({ id: result.lastInsertRowid, nome, documento, telefone });
});

hospedesRouter.delete("/:id", (req, res) => {
    const { id } = req.params;

    const hospede = db.prepare("SELECT id FROM hospedes WHERE id = ?").get(id);
    if (!hospede) {
        return res.status(404).json({ error: "Hóspede não encontrado" });
    }

    const reservaVinculada = db.prepare("SELECT id FROM reservas WHERE hospede_id = ?").get(id);
    if (reservaVinculada) {
        return res.status(400).json({ error: "Este hóspede possui reservas vinculadas e não pode ser excluído" });
    }

    db.prepare("DELETE FROM hospedes WHERE id = ?").run(id);
    res.status(204).send();
});
