import Joi from "joi";

export default Joi.object().keys({
  surveyId: Joi.string().required(),
  answers: Joi.array().optional(), // Accepts an array, even if empty
  isSkipped: Joi.boolean().optional(), // Accepts a boolean value (true or false)
});
