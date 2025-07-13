    document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("contenedor-productos");

    try {
        const res = await fetch("/api/productos");
        const productos = await res.json();

        if (!productos.length) {
        contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
        }

        productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${producto.foto}" alt="${producto.titulo}" class="card-img" />
            <h3>${producto.titulo}</h3>
            <p>Código: ${producto.codigo}</p>
            <p>Categoría: ${producto.categoria}</p>
            <p>Medidas: ${producto.ancho} x ${producto.largo} x ${producto.profundidad} cm</p>
            <p>Precio: $${producto.precio}</p>
        `;

        contenedor.appendChild(card);
        });
    } catch (err) {
        contenedor.innerHTML = "<p>Error al cargar productos.</p>";
        console.error(err);
    }
    });
