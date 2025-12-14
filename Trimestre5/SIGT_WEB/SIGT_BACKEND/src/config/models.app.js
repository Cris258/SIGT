import sequelize from "./connect.db.js";
import Asistencia from "../models/Asistencia.model.js";
import Carrito from "../models/Carrito.model.js";
import DetalleCarrito from "../models/DetalleCarrito.model.js";
import DetalleVenta from "../models/DetalleVenta.model.js";
import EstadoPersona from '../models/EstadoPersona.model.js';
import Persona from "../models/Persona.model.js";
import Producto from "../models/Producto.model.js";
import Rol from "../models/Rol.model.js";
import Tarea from "../models/Tarea.model.js";
import Venta from "../models/Venta.model.js";

export const modelsApp = function initModels(select) {
    if (select) {
        // EstadoPersona <-> Persona
        EstadoPersona.hasMany(Persona, {
            foreignKey: { name: "EstadoPersona_FK", allowNull: true }
        });
        Persona.belongsTo(EstadoPersona, {
            foreignKey: { name: "EstadoPersona_FK", allowNull: true },
            constraints: true,
        });

        // Rol - Persona
        Rol.hasMany(Persona, {
            foreignKey: { name: "Rol_FK", allowNull: false },
        });
        Persona.belongsTo(Rol, {
            foreignKey: { name: "Rol_FK", allowNull: false },
            constraints: true,
        });

        // Persona - Asistencia
        Persona.hasMany(Asistencia, {
            foreignKey: { name: "Persona_FK", allowNull: false },
        });
        Asistencia.belongsTo(Persona, {
            foreignKey: { name: "Persona_FK", allowNull: false },
            constraints: true,
        });

        // Persona - Tarea
        Persona.hasMany(Tarea, {
            foreignKey: { name: "Persona_FK", allowNull: false },
        });
        Tarea.belongsTo(Persona, {
            foreignKey: { name: "Persona_FK", allowNull: false },
            constraints: true,
        });

        // Persona - Carrito
        Persona.hasMany(Carrito, {
            foreignKey: { name: "Persona_FK", allowNull: false },
        });
        Carrito.belongsTo(Persona, {
            foreignKey: { name: "Persona_FK", allowNull: false },
            constraints: true,
        });

        // Carrito - DetalleCarrito
        Carrito.hasMany(DetalleCarrito, {
            foreignKey: { name: "Carrito_FK", allowNull: false },
        });
        DetalleCarrito.belongsTo(Carrito, {
            foreignKey: { name: "Carrito_FK", allowNull: false },
            constraints: true,
        });

        // Producto - DetalleCarrito
        Producto.hasMany(DetalleCarrito, {
            foreignKey: { name: "Producto_FK", allowNull: false },
        });
        DetalleCarrito.belongsTo(Producto, {
            foreignKey: { name: "Producto_FK", allowNull: false },
            constraints: true,
        });

        // Persona - Venta
        Persona.hasMany(Venta, {
            foreignKey: { name: "Persona_FK", allowNull: false },
        });
        Venta.belongsTo(Persona, {
            foreignKey: { name: "Persona_FK", allowNull: false },
            constraints: true,
        });

        // Venta - DetalleVenta
        Venta.hasMany(DetalleVenta, {
            foreignKey: { name: "Venta_FK", allowNull: false },
        });
        DetalleVenta.belongsTo(Venta, {
            foreignKey: { name: "Venta_FK", allowNull: false },
            constraints: true,
        });

        // Producto - Detalleventa
        Producto.hasMany(DetalleVenta, {
            foreignKey: { name: "Producto_FK", allowNull: false },
        });
        DetalleVenta.belongsTo(Producto, {
            foreignKey: { name: "Producto_FK", allowNull: false },
            constraints: true,
        });

        sequelize.sync();
    }
};