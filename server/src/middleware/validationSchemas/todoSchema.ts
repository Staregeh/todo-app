import Joi from "joi";

const todoSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  isDone: Joi.boolean().required(),
  isPrivate: Joi.boolean().required(),
});

export default todoSchema;
