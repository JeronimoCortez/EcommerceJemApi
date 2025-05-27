import app from "./app";

app.listen(process.env.PORT, () => {
  console.log("Escuchando en puerto: ", process.env.PORT);
});
