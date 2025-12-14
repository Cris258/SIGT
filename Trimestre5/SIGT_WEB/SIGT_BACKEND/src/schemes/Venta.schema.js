import Joi from "@hapi/joi";

export default {
    createVenta: Joi.object({
        Fecha: Joi.date().required(),
        Total: Joi.number().precision(2).required(),
        Persona_FK: Joi.number().integer().required(),
    }),

    updateVenta: Joi.object({
        Fecha: Joi.date(),
        Total: Joi.number().precision(2),
        Persona_FK: Joi.number().integer(),
    }),
};