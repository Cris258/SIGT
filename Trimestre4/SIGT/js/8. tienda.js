let carrito = JSON.parse(localStorage.getItem("carro")) || [];
    let indexAEliminar = null;

    function renderizarCarrito() {
      const body = document.getElementById("carro-body");
      body.innerHTML = "";
      let total = 0;

      if (carrito.length === 0) {
        body.innerHTML = `<tr><td colspan="7">Tu carrito está vacío 😢</td></tr>`;
        document.getElementById("total").textContent = "0";
        return;
      }

      carrito.forEach((prod, index) => {
        const subtotal = prod.precio * prod.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td><img src="${prod.imagen}" width="80"></td>
          <td>${prod.nombre}</td>
          <td>$${prod.precio}</td>
          <td>${prod.talla || 'No seleccionada'}</td>
          <td>
            <input type="number" class="form-control cantidad" value="${prod.cantidad}" min="1" data-index="${index}" style="width:80px">
          </td>
          <td>$${subtotal}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="confirmarEliminacion(${index})">Eliminar</button>
          </td>
        `;
        body.appendChild(fila);
      });

      document.getElementById("total").textContent = total;

      document.querySelectorAll(".cantidad").forEach(input => {
        input.addEventListener("input", actualizarCantidad);
      });
    }

    function actualizarCantidad(e) {
      const index = e.target.getAttribute("data-index");
      const nuevaCantidad = parseInt(e.target.value);
      if (nuevaCantidad >= 1) {
        carrito[index].cantidad = nuevaCantidad;
        localStorage.setItem("carro", JSON.stringify(carrito));
        renderizarCarrito();
      }
    }

    function confirmarEliminacion(index) {
      indexAEliminar = index;
      const modal = new bootstrap.Modal(document.getElementById('confirmarModal'));
      modal.show();
    }

    document.getElementById("btnConfirmarEliminar").onclick = () => {
      if (indexAEliminar !== null) {
        carrito.splice(indexAEliminar, 1);
        localStorage.setItem("carro", JSON.stringify(carrito));
        renderizarCarrito();
        indexAEliminar = null;
        bootstrap.Modal.getInstance(document.getElementById('confirmarModal')).hide();
      }
    };

    renderizarCarrito();