import express from "express";
import doten from "dotenv";
import { usuarioRouter } from "./routes/usuario";
import { tipoRouter } from "./routes/tipo";
doten.config();

const app = express();

app.use(express.json());

app.use("/usuarios", usuarioRouter);
app.use("/tipos", tipoRouter);

export default app;
