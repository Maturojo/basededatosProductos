    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    const path = require("path");
    const multer = require("multer");

    require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "../public")));
    app.use("/uploads", express.static(path.join(__dirname, "../public/uploads"))); // para servir imágenes

    // Conexión a MongoDB
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((err) => console.error("❌ Error de conexión:", err));

    // Esquema y modelo de Producto
    const productoSchema = new mongoose.Schema({
    titulo: String,
    codigo: String,
    categoria: String,
    ancho: Number,
    largo: Number,
    profundidad: Number,
    precio: Number,
    foto: String,
    });

    const Producto = mongoose.model("Producto", productoSchema);

    // Configuración de multer (para guardar imágenes)
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

    // Ruta: Obtener todos los productos
    app.get("/api/productos", async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });

    // Ruta: Crear producto con imagen
    app.post("/api/productos", upload.single("foto"), async (req, res) => {
    try {
        const { titulo, codigo, categoria, ancho, largo, profundidad, precio } = req.body;
        const imagenUrl = req.file ? "/uploads/" + req.file.filename : "";

        const nuevo = new Producto({
        titulo,
        codigo,
        categoria,
        ancho,
        largo,
        profundidad,
        precio,
        foto: imagenUrl,
        });

        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    });

    // Servidor
    app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
