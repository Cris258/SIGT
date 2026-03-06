import detalleCarritoModel from "../models/DetalleCarrito.model.js";
import carritoModel from "../models/Carrito.model.js";

export const createDetalleCarrito = async (req, res) => {
    try {
        await detalleCarritoModel.sync();
        const { Cantidad, Carrito_FK, Producto_FK } = req.body;

        if (req.user.rol === "Cliente") {
            const carrito = await carritoModel.findOne({
                where: { idCarrito: Carrito_FK, Persona_FK: req.user.id },
            });
            if (!carrito) {
                return res.status(403).json({ Message: "No puedes agregar detalles a un carrito que no es tuyo" });
            }
        }

        const createDetalleCarrito = await detalleCarritoModel.create({
            Cantidad,
            Carrito_FK: parseInt(Carrito_FK),
            Producto_FK: parseInt(Producto_FK),
        });

        res.status(201).json({
            ok: true,
            status: 201,
            Message: "Detalle del Carrito Creado",
            id: createDetalleCarrito.idDetalleCarrito,
        });
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

export const showDetalleCarrito = async (req, res) => {
    try {
        await detalleCarritoModel.sync();
        let detalles;

        if (req.user.rol === "Cliente") {
            detalles = await detalleCarritoModel.findAll({
                include: [{ model: carritoModel, where: { Persona_FK: req.user.id } }],
            });
        } else {
            detalles = await detalleCarritoModel.findAll();
        }

        res.status(200).json({
            ok: true,
            status: 200,
            Message: "Ver Detalle del Carrito",
            body: detalles,
        });
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

export const showIdDetalleCarrito = async (req, res) => {
    try {
        await detalleCarritoModel.sync();
        const idDetalleCarrito = req.params.id;
        const detalle = await detalleCarritoModel.findOne({
            where: { idDetalleCarrito },
            include: [{ model: carritoModel }],
        });

        if (!detalle) {
            return res.status(404).json({ Message: "Detalle no encontrado" });
        }

        if (req.user.rol === "Cliente" && detalle.Carrito.Persona_FK !== req.user.id) {
            return res.status(403).json({ Message: "No puedes ver un detalle de carrito que no es tuyo" });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            Message: "Ver Detalle del Carrito por ID",
            body: detalle,
        });
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

export const updateDetalleCarrito = async (req, res) => {
    try {
        await detalleCarritoModel.sync();
        const idDetalleCarrito = req.params.id;
        const { Cantidad, Carrito_FK, Producto_FK } = req.body;

        const detalle = await detalleCarritoModel.findOne({
            where: { idDetalleCarrito },
            include: [{ model: carritoModel }],
        });

        if (!detalle) {
            return res.status(404).json({ Message: "Detalle no encontrado" });
        }

        if (req.user.rol === "Cliente" && detalle.Carrito.Persona_FK !== req.user.id) {
            return res.status(403).json({ Message: "No puedes actualizar un detalle de carrito que no es tuyo" });
        }

        const updateDetalleCarrito = await detalleCarritoModel.update(
            {
                Cantidad,
                Carrito_FK: parseInt(Carrito_FK),
                Producto_FK: parseInt(Producto_FK),
            },
            { where: { idDetalleCarrito } }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            Message: "Detalle del Carrito Actualizado",
            body: updateDetalleCarrito,
        });
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

export const deleteDetalleCarrito = async (req, res) => {
    try {
        await detalleCarritoModel.sync();
        const idDetalleCarrito = req.params.id;
        const detalle = await detalleCarritoModel.findOne({
            where: { idDetalleCarrito },
            include: [{ model: carritoModel }],
        });

        if (!detalle) {
            return res.status(404).json({ Message: "Detalle no encontrado" });
        }

        if (req.user.rol === "Cliente" && detalle.Carrito.Persona_FK !== req.user.id) {
            return res.status(403).json({ Message: "No puedes eliminar un detalle de carrito que no es tuyo" });
        }

        const deleteDetalleCarrito = await detalleCarritoModel.destroy({
            where: { idDetalleCarrito },
        });

        res.status(200).json({
            ok: true,
            status: 200,
            Message: "Detalle del Carrito Eliminado",
            body: deleteDetalleCarrito,
        });
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