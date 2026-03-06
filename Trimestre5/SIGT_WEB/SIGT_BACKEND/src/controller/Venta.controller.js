import ventaModel from "../models/Venta.model.js";
import detalleVentaModel from "../models/DetalleVenta.model.js";
import productoModel from "../models/Producto.model.js";
import personaModel from "../models/Persona.model.js";

export const createVenta = async (req, res) => {
  try {
    await ventaModel.sync();
    const dataVenta = req.body;
    const createVenta = await ventaModel.create({
      Fecha: dataVenta.Fecha,
      Total: dataVenta.Total,
      Persona_FK: parseInt(dataVenta.Persona_FK),
    });
    res.status(201).json({
      ok: true,
      status: 201,
      Message: "Venta Creada",
      id: createVenta.idVenta,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const showVenta = async (req, res) => {
  try {
    await ventaModel.sync();
    let ventas;

    if (req.user.rol === "Cliente" || req.user.rol === "Empleado") {
      ventas = await ventaModel.findAll({
        where: { Persona_FK: req.user.id },
      });
    } else {
      ventas = await ventaModel.findAll();
    }

    res.status(200).json({
      ok: true,
      status: 200,
      Message: "Ver Ventas",
      body: ventas,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const showIdVenta = async (req, res) => {
  try {
    await ventaModel.sync();
    const idVenta = req.params.id;

    const venta = await ventaModel.findOne({
      where: { idVenta },
    });

    if (!venta) {
      return res.status(404).json({ Message: "Venta no encontrada" });
    }

    if (
      (req.user.rol === "Cliente" || req.user.rol === "Empleado") &&
      venta.Persona_FK !== req.user.id
    ) {
      return res
        .status(403)
        .json({ Message: "No puedes ver una venta que no es tuya" });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      Message: "Ver Venta por ID",
      body: venta,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const updateVenta = async (req, res) => {
  try {
    await ventaModel.sync();
    const dataVenta = req.body;
    const idVenta = req.params.id;
    const updateVenta = await ventaModel.update(
      {
        Fecha: dataVenta.Fecha,
        Total: dataVenta.Total,
        Persona_FK: parseInt(dataVenta.Persona_FK),
      },
      {
        where: {
          idVenta: idVenta,
        },
      }
    );
    res.status(200).json({
      ok: true,
      status: 201,
      Message: "Venta Actualizada",
      body: updateVenta,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const deleteVenta = async (req, res) => {
  try {
    await ventaModel.sync();
    const idVenta = req.params.id;
    const deleteVenta = await ventaModel.destroy({
      where: {
        idVenta: idVenta,
      },
    });
    res.status(200).json({
      ok: true,
      status: 201,
      Message: "Venta Eliminada",
      body: deleteVenta,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

// Obtener historial de compras de un cliente específico
export const obtenerHistorialPorCliente = async (req, res) => {
  try {
    const { idPersona } = req.params;

    console.log("Buscando historial para idPersona:", idPersona);

    // Verificar que la persona existe
    const persona = await personaModel.findByPk(idPersona);
    if (!persona) {
      return res.status(404).json({
        ok: false,
        msg: "Persona no encontrada",
      });
    }

    console.log("Persona encontrada:", persona.Primer_Nombre);

    // Obtener todas las ventas de la persona
    const ventas = await ventaModel.findAll({
      where: { Persona_FK: idPersona },
      order: [["Fecha", "DESC"]],
    });

    console.log("Ventas encontradas:", ventas.length);

    // Importa el modelo de carrito
    const carritoModel = (await import("../models/Carrito.model.js")).default;

    // Para cada venta, obtener sus detalles y el carrito relacionado
    const ventasConDetalles = await Promise.all(
      ventas.map(async (venta) => {
        // Buscar el carrito que generó esta venta (por fecha y persona)
        const carrito = await carritoModel.findOne({
          where: { 
            Persona_FK: idPersona,
            Estado: 'completado'
          },
          order: [["FechaCreacion", "DESC"]]
        });

        const detalles = await detalleVentaModel.findAll({
          where: { Venta_FK: venta.idVenta },
        });

        const detallesConProducto = await Promise.all(
          detalles.map(async (detalle) => {
            const producto = await productoModel.findByPk(detalle.Producto_FK);
            return {
              NombreProducto: producto.NombreProducto,
              Color: producto.Color,
              Talla: producto.Talla,
              Cantidad: detalle.Cantidad,
              PrecioUnitario: parseFloat(detalle.PrecioUnitario),
            };
          })
        );

        return {
          idVenta: venta.idVenta,
          idCarrito: carrito ? carrito.idCarrito : null,
          FechaVenta: venta.Fecha,
          Total: parseFloat(venta.Total),
          EstadoCarrito: carrito ? carrito.Estado : "N/A",
          detalles: detallesConProducto,
        };
      })
    );

    console.log("Ventas formateadas:", ventasConDetalles);

    res.status(200).json({
      ok: true,
      body: ventasConDetalles,
    });
  } catch (error) {
    console.error("Error completo al obtener historial:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener el historial de compras",
      error: error.message,
    });
  }
};