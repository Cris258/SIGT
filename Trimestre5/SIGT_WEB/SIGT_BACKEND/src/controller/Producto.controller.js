import productoModel from "../models/Producto.model.js";

export const createProducto = async (req, res) => {
  try {
    await productoModel.sync();
    const dataProducto = req.body;
    const createProducto = await productoModel.create({
      NombreProducto: dataProducto.NombreProducto,
      Color: dataProducto.Color,
      Talla: dataProducto.Talla,
      Stock: dataProducto.Stock,
      Precio: dataProducto.Precio,
    });
    res.status(201).json({
      ok: true,
      status: 201,
      Message: "Producto Creado",
      id: createProducto.idProducto,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const showProducto = async (req, res) => {
  try {
    await productoModel.sync();
    const showProducto = await productoModel.findAll();
    res.status(201).json({
      ok: true,
      status: 201,
      Message: "Ver Producto",
      body: showProducto,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const showIdProducto = async (req, res) => {
  try {
    await productoModel.sync();
    const idProducto = req.params.id;
    const showIdProducto = await productoModel.findOne({
      where: {
        idProducto: idProducto,
      },
    });
    res.status(200).json({
      ok: true,
      status: 201,
      Message: "Ver Producto por id",
      body: showIdProducto,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const updateProducto = async (req, res) => {
  try {
    await productoModel.sync();
    const dataProducto = req.body;
    const idProducto = req.params.id;
    const updateProducto = await productoModel.update(
      {
        NombreProducto: dataProducto.NombreProducto,
        Color: dataProducto.Color,
        Talla: dataProducto.Talla,
        Stock: dataProducto.Stock,
        Precio: dataProducto.Precio,
      },
      {
        where: {
          idProducto: idProducto,
        },
      }
    );
    res.status(200).json({
      ok: true,
      status: 201,
      Message: "Producto Actualizado",
      body: updateProducto,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    await productoModel.sync();
    const idProducto = req.params.id;
    const deleteProducto = await productoModel.destroy({
      where: {
        idProducto: idProducto,
      },
    });
    res.status(200).json({
      ok: true,
      status: 201,
      Message: "Producto Eliminado",
      body: deleteProducto,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Algo salio mal con la solicitud",
      status: 500,
      error: error.message,
    });
  }
};

import db from "../config/connect.db.js";

// Obtener todos los productos del inventario
export const obtenerProductos = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.idProducto AS ID,
        p.NombreProducto AS Nombre,
        p.Color,
        p.Talla,
        p.Stock,
        p.Precio
      FROM productos p
      ORDER BY p.Stock ASC
    `;
    
    const [productos] = await db.query(query);
    
    res.json({
      success: true,
      data: productos
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

// Obtener top 5 productos más vendidos
export const obtenerTopProductos = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.idProducto AS ID,
        p.NombreProducto AS Nombre,
        p.Color,
        p.Talla,
        p.Stock,
        p.Precio,
        COALESCE(SUM(dv.Cantidad), 0) AS UnidadesVendidas
      FROM productos p
      LEFT JOIN detalleventa dv ON p.idProducto = dv.Producto_FK
      GROUP BY p.idProducto
      ORDER BY UnidadesVendidas DESC
      LIMIT 5
    `;
    
    const [topProductos] = await db.query(query);
    
    res.json({
      success: true,
      data: topProductos
    });
  } catch (error) {
    console.error('Error al obtener top productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener top productos',
      error: error.message
    });
  }
};

// Obtener estadísticas del inventario
export const obtenerEstadisticasInventario = async (req, res) => {
  try {
    const queryPorTalla = `
      SELECT 
        Talla,
        COUNT(*) AS Cantidad
      FROM productos
      GROUP BY Talla
      ORDER BY Talla
    `;
    
    const [porTalla] = await db.query(queryPorTalla);
    
    res.json({
      success: true,
      data: {
        porTalla
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
};