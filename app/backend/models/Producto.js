    const mongoose = require("mongoose");

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

    module.exports = mongoose.model("Producto", productoSchema);
