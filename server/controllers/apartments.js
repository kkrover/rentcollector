/* eslint-disable newline-per-chained-call, new-cap, no-param-reassign, consistent-return, no-underscore-dangle, array-callback-return, max-len */
import express from 'express';
const router = module.exports = express.Router();
import Apartment from '../models/apartment';
import Renter from '../models/renter';
const bodyValidator = require('../../dst/validators/apartments/body');
const paramsValidator = require('../../dst/validators/apartments/params');
const queryValidator = require('../../dst/validators/apartments/query');

// create
router.post('/', bodyValidator, (req, res) => {
  const apartment = new Apartment(res.locals);
  apartment.save((err) => {
    res.send({ apartment });
  });
});

// show
router.get('/', queryValidator, (req, res) => {
  Apartment.filter(Apartment, res, (err, apartments) => {
    res.send({ apartments });
  });
});

// update
router.put('/:id/lease', paramsValidator, (req, res) => {
  Apartment.findByIdAndUpdate(req.params.id, { renter: req.body.renter }, { new: true }, (err, apartment) => {
    Renter.findByIdAndUpdate(req.body.renter, { apartment: req.params.id }, (err2) => {
      res.send({ apartment });
    });
  });
});
