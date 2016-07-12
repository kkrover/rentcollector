import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  sqft: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  floor: { type: Number, required: true },
  rent: { type: Number, required: true },
  rentCollected: { type: Number, default: 0 },
  renter: { type: String },
});

schema.statics.filter = function (obj, res, cb) {
  const query = obj.find();
  if (res.locals.filter) {
    if (res.locals.filter.bedrooms) {
      query.where('bedrooms').gte(res.locals.filter.bedrooms);
    }
    if (res.locals.filter.sqft) {
      query.where('sqft').gte(res.locals.filter.sqft);
    }

    if (res.locals.filter.vacant) {
      query.where('renter').eq('');
    }
    if (res.locals.filter.vacant === false) {
      query.where('renter').ne('');
    }

    query.sort(res.locals.sort);
  }
  query.exec((err, apartments) => {
    cb(err, apartments);
  });
};

module.exports = mongoose.model('Apartment', schema);
