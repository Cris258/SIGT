import Joi from "@hapi/joi";

export default {
    createTarea: Joi.object({
        Descripcion: Joi.string().required(),
        FechaAsignacion: Joi.date().required(),
        FechaLimite: Joi.date().required(),
        EstadoTarea: Joi.string().required(),
        Prioridad: Joi.string().required(),
        Persona_FK: Joi.number().integer().required(),
    }),

    updateTarea: Joi.object({
        Descripcion: Joi.string(),
        FechaAsignacion: Joi.date(),
        FechaLimite: Joi.date(),
        EstadoTarea: Joi.string(),
        Prioridad: Joi.string(),
        Persona_FK: Joi.number().integer(),
    }),
};