/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */
import express from 'express';
const router = module.exports = express.Router();
import Renter from '../models/renter';
const bodyValidator = require('../../dst/validators/renters/body');
const paramsValidator = require('../../dst/validators/renters/params');
// create
router.post('/', bodyValidator, (req, res) => {
  const renter = new Renter(req.body);
  renter.save(() => {
    res.send({ renter });
  });
});

// show
router.get('/', (req, res) => {
  Renter.find((err, renters) => {
    res.send({ renters });
  });
});

router.put('/:id/pay', (req, res) => {
  Renter.findById(req.params.id).populate('apartment')
  .exec((err, renter) => {
    renter.pay(() => {
      res.send({ renter });
    });
  });
});
