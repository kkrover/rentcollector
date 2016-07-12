/* eslint-disable no-param-reassign */
import joi from 'joi';

const schema = {
  name: joi.string().required().regex(/^[0-9a-zA-Z]+$/),
  sqft: joi.number().required().min(1),
  bedrooms: joi.number().required().min(1),
  floor: joi.number().required().min(1),
  rent: joi.number().required().min(1),
  renter: joi.string(),
};

module.exports = (req, res, next) => {
  const result = joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send({ messages: result.error.details.map(d => d.message) });
  } else {
    res.locals = result.value;
    next();
  }
};
