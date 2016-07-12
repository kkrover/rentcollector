import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema ({
  name: { type: String, required: true },
  money: { type: Number, required: true },
  apartment: { type: mongoose.Schema.ObjectId, ref: 'Apartment' },
});

schema.methods.pay = function (fn) {
  this.money -= this.apartment.rent;
  this.save(() => {
    this.apartment.rentCollected += this.apartment.rent;
    this.apartment.save(() => {
      fn();
    });
  });
};

module.exports = mongoose.model('Renter', schema);
