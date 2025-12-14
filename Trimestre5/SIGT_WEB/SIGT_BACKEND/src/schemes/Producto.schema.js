import Joi from "@hapi/joi";

export default {
    createProducto: Joi.object({
        NombreProducto: Joi.string().required(),
        Color: Joi.string().required(),
        Talla: Joi.string().valid("XS", "S", "M", "L", "XL", "2", "4", "6", "8", "10", "12", "14", "16").required(),
        Stock: Joi.number().integer().required(),
        Precio: Joi.number().required(),
    }),

    updateProducto: Joi.object({
        NombreProducto: Joi.string(),
        Color: Joi.string(),
        Talla: Joi.string().valid("XS", "S", "M", "L", "XL", "2", "4", "6", "8", "10", "12", "14", "16"),
        Stock: Joi.number().integer(),
        Precio: Joi.number(),
    }),
};