    document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formProducto");
    const lista = document.getElementById("productos");

    let productos = [];
    let editIndex = null;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nuevoProducto = {
        titulo: form.titulo.value.trim(),
        codigo: form.codigo.value.trim(),
        ancho: parseFloat(form.ancho.value),
        largo: parseFloat(form.largo.value),
        profundidad: parseFloat(form.profundidad.value),


        precio: parseFloat(form.precio.value),
        foto: form.foto.value.trim(),
        };

        if (editIndex !== null) {
        productos[editIndex] = nuevoProducto;
        editIndex = null;
        form.querySelector("button").textContent = "Agregar Producto";
        } else {
        productos.push(nuevoProducto);
        }

        renderProductos();
        form.reset();
    });

    function renderProductos() {
        lista.innerHTML = "";

        productos.forEach((prod, index) => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <h3>${prod.titulo}</h3>
            <p><strong>Código:</strong> ${prod.codigo}</p>
            <p><strong>Medidas:</strong> ${prod.ancho} x ${prod.largo} x ${prod.profundidad} cm</p>

            <p><strong>Precio:</strong> $${prod.precio.toFixed(2)}</p>
            ${
            prod.foto
                ? `<img src="${prod.foto}" alt="${prod.titulo}" loading="lazy">`
                : ""
            }
            <div class="acciones">
            <button class="btn-editar" data-index="${index}">✏️ Editar</button>
            <button class="btn-eliminar" data-index="${index}">🗑️ Eliminar</button>
            </div>
        `;

        lista.appendChild(div);
        });

        agregarEventosBotones();
    }

    function agregarEventosBotones() {
        document.querySelectorAll(".btn-eliminar").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            productos.splice(index, 1);
            renderProductos();
        });
        });

        document.querySelectorAll(".btn-editar").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            const prod = productos[index];

            form.titulo.value = prod.titulo;
            form.codigo.value = prod.codigo;
            form.ancho.value = producto.ancho;
            form.largo.value = producto.largo;
            form.profundidad.value = producto.profundidad;

            form.ancho.value = ancho;
            form.largo.value = largo;
            form.profundidad.value = profundidad;

            form.precio.value = prod.precio;
            form.foto.value = prod.foto;

            editIndex = index;
            form.querySelector("button").textContent = "Guardar Cambios";
        });
        });
    }
    });
