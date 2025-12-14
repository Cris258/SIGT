import Joi from "@hapi/joi"

export default {
    createAsistencia: Joi.object({
        Fecha: Joi.date().iso().required(),
        Hora_Entrada: Joi.string().required(),
        Hora_Salida: Joi.string().required(),
        Incapacidad: Joi.number().integer().valid(0, 1),
        Persona_FK: Joi.number().integer().required(),
    }),

    updateAsistencia: Joi.object({
        Fecha: Joi.date().iso(),
        Hora_Entrada: Joi.string(),
        Hora_Salida: Joi.string(),
        Incapacidad: Joi.number().integer().valid(0, 1),
        Persona_FK: Joi.number().integer().required(),
    }),
}