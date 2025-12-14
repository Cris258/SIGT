import Joi from "@hapi/joi"

export default {
    createPersona: Joi.object({
        NumeroDocumento: Joi.number().required(),
        TipoDocumento: Joi.string().valid("CC", "TI", "CE", "Pasaporte").required(),
        Primer_Nombre: Joi.string().required(),
        Segundo_Nombre: Joi.string(),
        Primer_Apellido: Joi.string().required(),
        Segundo_Apellido: Joi.string(),
        Telefono: Joi.number().required(),
        Correo: Joi.string().email(),
        Password: Joi.string().required().min(5),
        Rol_FK: Joi.number().required(),
    }),

    updatePersona: Joi.object({
        NumeroDocumento: Joi.number(),
        TipoDocumento: Joi.string().valid("CC", "TI", "CE", "Pasaporte"),
        Primer_Nombre: Joi.string(),
        Segundo_Nombre: Joi.string(),
        Primer_Apellido: Joi.string(),
        Segundo_Apellido: Joi.string(),
        Telefono: Joi.number(),
        Correo: Joi.string(),
        Rol_FK: Joi.number(),
        EstadoPersona_FK: Joi.number(),
    }),

    createCliente: Joi.object({
        NumeroDocumento: Joi.number().required(),
        TipoDocumento: Joi.string().valid("CC", "TI", "CE", "PA").required(),
        Primer_Nombre: Joi.string().required(),
        Segundo_Nombre: Joi.string(),
        Primer_Apellido: Joi.string().required(),
        Segundo_Apellido: Joi.string(),
        Telefono: Joi.number().required(),
        Correo: Joi.string().email().required(),
        Password: Joi.string().required().min(5),
    }),
}