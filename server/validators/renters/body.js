/* eslint-disable no-param-reassign */
import joi from 'joi';

const schema = {
  name: joi.string().required().regex(/^[a-zA-Z]+$/),
  money: joi.number().required().min(1),
};


module.exports = (req, res, next) => {
  const result = joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send({ message: result.error.details.map(d => d.message) });
  } else {
    res.locals = result.value;
    next();
  }
};
