    const express = require("express");
    const router = express.Router();
    const Producto = require("../models/Producto");
    const multer = require("multer");
    const path = require("path");

    // Configuración de almacenamiento de imágenes
    const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: (req, file, cb) => {
        const nombreUnico = Date.now() + "-" + file.originalname;
        cb(null, nombreUnico);
    },
    });

    const upload = multer({ storage });

    // Obtener todos los productos
    router.get("/", async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener productos." });
    }
    });

    // Agregar producto con imagen
    router.post("/", upload.single("foto"), async (req, res) => {
    try {
        const { titulo, codigo, categoria, ancho, largo, profundidad, precio } = req.body;
        const imagenUrl = req.file ? "/uploads/" + req.file.filename : "";

        const nuevoProducto = new Producto({
        titulo,
        codigo,
        categoria,
        ancho,
        largo,
        profundidad,
        precio,
        foto: imagenUrl,
        });

        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (err) {
        console.error("❌ Error al guardar producto:", err);
        res.status(500).json({ error: "No se pudo guardar el producto." });
    }
    });

    module.exports = router;
