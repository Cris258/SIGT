import sequelize from "../config/connect.db.js";
import { Model, DataTypes } from "sequelize";

class Asistencia extends Model {}
Asistencia.init(
    {
        idAsistencia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        Hora_Entrada: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        Hora_Salida: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        Incapacidad: {
            type: DataTypes.TINYINT,
            allowNull: true,
        },
        Persona_FK: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Personas',
                key: 'idPersona',
            }
        }
    }, { sequelize, modelName: "Asistencia" }
);

export default Asistencia;