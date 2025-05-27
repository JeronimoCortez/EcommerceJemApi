import express from "express";
import doten from "dotenv";
doten.config();

const app = express();

app.use(express.json());

export default app;
