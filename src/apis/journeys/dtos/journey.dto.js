import Joi from "joi";

export default Joi.object().keys({
  pageId: Joi.string().required(),
  questionId: Joi.string().optional(),
  answerOptionId: Joi.array().optional(),
  customInputText: Joi.string().optional(),
});
