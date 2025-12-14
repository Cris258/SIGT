import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class Venta extends Model {}
Venta.init(
    {
        idVenta: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        Persona_FK: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Personas',
                key: 'idPersona',
            }
        }
    }, { sequelize, modelName: "Venta" }
);

export default Venta;