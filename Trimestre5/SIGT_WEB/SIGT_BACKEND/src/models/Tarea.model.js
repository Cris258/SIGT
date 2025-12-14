import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class Tarea extends Model { }
Tarea.init(
    {
        idTarea: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        FechaAsignacion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        FechaLimite: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        EstadoTarea: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Prioridad: {
            type: DataTypes.STRING,
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
    }, {sequelize, modelName: "Tarea"}
);

export default Tarea;