import express from "express";
import cors from "cors";
import "./db";
import { quartosRouter } from "./routes/quartos";
import { hospedesRouter } from "./routes/hospedes";
import { reservasRouter } from "./routes/reservas";
import { notFoundRequest, errorHandler } from "./routes/errorhandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/quartos", quartosRouter);
app.use("/hospedes", hospedesRouter);
app.use("/reservas", reservasRouter);

app.use(notFoundRequest);
app.use(errorHandler);

app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001");
});
