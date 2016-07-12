/* eslint-disable consistent-return, no-param-reassign */

import joi from 'joi';

const schema = {
  filter: joi.object().keys({
    bedrooms: joi.number(),
    sqft: joi.number(),
    vacant: joi.boolean(),
  }),
  sort: joi.object(),
};

module.exports = (req, res, next) => {
  const result = joi.validate(req.query, schema);

  if (result.error) {
    console.log('err', result.error);
    res.status(400).send({ messages: result.error.details.map(d => d.message) });
  } else {
    res.locals = result.value;
    next();
  }
};
