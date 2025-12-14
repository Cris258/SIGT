import detalleVentaModel from "../models/DetalleVenta.model.js";
import ventaModel from "../models/Venta.model.js";

export const createDetalleVenta = async (req, res) => {
    try {
        await detalleVentaModel.sync();
        const dataDetalleVenta = req.body;
        const createDetalleVenta = await detalleVentaModel.create(
            {
                Cantidad: dataDetalleVenta.Cantidad,
                PrecioUnitario: dataDetalleVenta.PrecioUnitario,
                Producto_FK: parseInt(dataDetalleVenta.Producto_FK),
                Venta_FK: parseInt(dataDetalleVenta.Venta_FK),
            }
        );
        res.status(201).json(
            {
                ok: true,
                status: 201,
                Message: "Detalle de la Venta Creada",
                id: createDetalleVenta.idDetalleVenta,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                Message: "Algo salio mal con la solicitud",
                status: 500,
                error: error.message
            }
        );
    }
};

export const showDetalleVenta = async (req, res) => {
    try {
        await detalleVentaModel.sync();
        let detalles;

        if (req.user.rol === "Cliente") {
            detalles = await detalleVentaModel.findAll({
                include: [{ model: ventaModel, where: { Persona_FK: req.user.id } }],
            });
        } else {
            detalles = await detalleVentaModel.findAll();
        }

        res.status(200).json({
            ok: true,
            status: 200,
            Message: "Ver Detalles de la Venta",
            body: detalles,
        });
    } catch (error) {
        return res.status(500).json({
            Message: "Algo salió mal con la solicitud",
            status: 500,
            error: error.message
        });
    }
};

export const showIdDetalleVenta = async (req, res) => {
    try {
        await detalleVentaModel.sync();
        const idDetalleVenta = req.params.id;
        const detalle = await detalleVentaModel.findOne({
            where: { idDetalleVenta },
            include: [{ model: ventaModel }],
        });

        if (!detalle) {
            return res.status(404).json({ Message: "Detalle no encontrado" });
        }

        if (req.user.rol === "Cliente" && detalle.Venta.Persona_FK !== req.user.id) {
            return res.status(403).json({ Message: "No puedes ver un detalle de venta que no es tuyo" });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            Message: "Ver Detalle de la Venta por ID",
            body: detalle,
        });
    } catch (error) {
        return res.status(500).json({
            Message: "Algo salió mal con la solicitud",
            status: 500,
            error: error.message
        });
    }
};

export const updateDetalleVenta = async (req, res) => {
    try {
        await detalleVentaModel.sync();
        const dataDetalleVenta = req.body;
        const idDetalleVenta = req.params.id;
        const updateDetalleVenta = await detalleVentaModel.update(
            {
                Cantidad: dataDetalleVenta.Cantidad,
                PrecioUnitario: dataDetalleVenta.PrecioUnitario,
                Producto_FK: parseInt(dataDetalleVenta.Producto_FK),
                Venta_FK: parseInt(dataDetalleVenta.Venta_FK),
            },
            {
                where: {
                    idDetalleVenta: idDetalleVenta
                }
            }
        );
        res.status(200).json(
            {
                ok: true,
                status: 201,
                Message: "Detalle de la Venta Actualizado",
                body: updateDetalleVenta,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                Message: "Algo salio mal con la solicitud",
                status: 500,
                error: error.message
            }
        );
    }
};

export const deleteDetalleVenta = async (req, res) => {
    try {
        await detalleVentaModel.sync();
        const idDetalleVenta = req.params.id;
        const deleteDetalleVenta = await detalleVentaModel.destroy(
            {
                where: {
                    idDetalleVenta: idDetalleVenta
                }
            }
        );
        res.status(200).json(
            {
                ok: true,
                status: 201,
                Message: "Detalle de la Venta Eliminado",
                body: deleteDetalleVenta,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                Message: "Algo salio mal con la solicitud",
                status: 500,
                error: error.message
            }
        );
    }
};