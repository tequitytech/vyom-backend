import Joi from "joi";

export default Joi.object().keys({
  chapterId: Joi.string().required(),
});
