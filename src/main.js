import { LIBROS_JSON, PORT } from "./config.js";
import express from "express";
import { ProductosManager } from "./ProductosManager.js";

const pro = new ProductosManager(LIBROS_JSON);
const app = express();

app.get("/relojes", async (req, res) => {
    const limit = req.query.limit;
    const brand = req.query.brand;
    try {
        const relojes = await pro.getAll({ brand, limit });
        res.json(relojes);
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        });
    }
});

app.get("/relojes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const relojes = await pro.getById(id);
        res.json(relojes);
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        });
    }
});
app.listen(PORT, () => {
    console.log(`DCZ SRV: Conectado en puerto: [${PORT}]`);
});
