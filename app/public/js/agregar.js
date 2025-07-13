    document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formProducto");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
        const res = await fetch("/api/productos", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Error al guardar");

        alert("✅ Producto guardado correctamente");
        form.reset();
        } catch (err) {
        console.error("❌", err.message);
        alert("❌ No se pudo guardar: " + err.message);
        }
    });
    });
