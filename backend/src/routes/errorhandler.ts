import { type ErrorRequestHandler, type RequestHandler } from "express";

export const notFoundRequest: RequestHandler = (req, res) => {
    res.status(404).json({ error: 'Rota não Encontrada' });
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
}
