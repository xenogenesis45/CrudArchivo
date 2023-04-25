import Express from "express";
import cors from "cors";
const app = Express();
const port = 8000;

// Middleware para procesar el cuerpo de las peticiones HTTP
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors())

// Rutas
import obtenerPersona  from "./router/routerPersona.js";
app.use("/api/personas", obtenerPersona);

// Error handler
app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(500).send("¡Algo se rompió!");
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor levantado en http://localhost:${port}`);
});