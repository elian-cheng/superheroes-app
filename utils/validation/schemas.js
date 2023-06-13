const Joi = require("@hapi/joi");

const schemas = {
  hero: Joi.object({
    nickname: Joi.string().max(50),
    real_name: Joi.string().max(50),
    origin_description: Joi.string().max(300),
    superpowers: Joi.string().max(200),
    catch_phrase: Joi.string().max(200),
    images: Joi.array().items(Joi.string())
  })
};

module.exports = schemas;
