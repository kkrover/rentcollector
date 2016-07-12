import joi from 'joi';

const schema = {
  id: joi.string().required().regex(/^[0-9a-f]{24}$/),
};

module.exports = (req, res, next) => {
  const result = joi.validate(req.params, schema);
  if (result.error) {
    res.status(400).send({ message: result.error.details.map(d => d.message) });
  } else {
    next();
  }
};
