<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Carrito de Compras - Vibra</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <style>
    body {
      background-color: #f9f9f9;
      font-family: 'Segoe UI', sans-serif;
    }
    .container {
      margin-top: 50px;
    }
    .btn-custom {
      background-color: #e5b1f4;
      color: black;
      border: none;
    }
    .btn-custom:hover {
      background-color: #d28be5;
    }
    .table th, .table td {
      vertical-align: middle;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2 class="text-center mb-4">🛒 Tu Carrito de Compras</h2>

    <table class="table text-center">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Talla</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="carro-body">
        <!-- Productos se insertan aquí -->
      </tbody>
    </table>

    <div class="text-end">
      <h4>Total: $<span id="total">0</span></h4>
    </div>

    <div class="d-flex justify-content-between mt-4">
      <a href="Usuario.php" class="btn btn-secondary">Seguir Comprando</a>
      <a href="#" class="btn btn-custom">Finalizar Compra</a>
    </div>
  </div>

  <!-- Modal de confirmación -->
  <div class="modal fade" id="confirmarModal" tabindex="-1" aria-labelledby="confirmarLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirmarLabel">¿Estás seguro?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          ¿Deseas eliminar este producto del carrito?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger" id="btnConfirmarEliminar">Eliminar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- JS del carrito -->
  <script>
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
  </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>