import express from "express";
import doten from "dotenv";
import { usuarioRouter } from "./routes/usuario";
import { tipoRouter } from "./routes/tipo";
import { productoTalleRouter } from "./routes/productoTalle";
import { productoRouter } from "./routes/producto";
import { ordenCompraRouter } from "./routes/ordenCompra";
import { categoriaRouter } from "./routes/categoria";
import { descuentoRouter } from "./routes/descuento";
import { detalleRouter } from "./routes/detalle";
import { direccionRouter } from "./routes/direccion";
doten.config();

const app = express();

app.use(express.json());

app.use("/usuarios", usuarioRouter);
app.use("/tipos", tipoRouter);
app.use("/talles", productoTalleRouter);
app.use("/productos", productoRouter);
app.use("/ordenCompra", ordenCompraRouter);
app.use("/categorias", categoriaRouter);
app.use("/descuentos", descuentoRouter);
app.use("/detalles", detalleRouter);
app.use("/direcciones", direccionRouter);

export default app;
