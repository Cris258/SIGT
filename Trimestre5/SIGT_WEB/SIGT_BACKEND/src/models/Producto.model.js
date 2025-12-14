import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class Producto extends Model { }
Producto.init(
    {
        idProducto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        NombreProducto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Talla: {
            type: DataTypes.ENUM("XS", "S", "M", "L", "XL", "2", "4", "6", "8", "10", "12", "14", "16"),
            allowNull: false,
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        }
    }, { sequelize, modelName: "Producto" }
);

export default Producto;