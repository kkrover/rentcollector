/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');

describe('rentcollector', () => {
  beforeEach((done) => {
    cp.execFile(`${__dirname}/../scripts/populate-renters.sh`, { cwd: `${__dirname}/../scripts` }, () => {
      cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
        done();
      });
    });
  });

  describe('post /renters', () => {
    it('should create a renter', (done) => {
      request(app)
      .post('/renters')
      .send({
        name: 'Steve',
        money: 10000,
      })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renter.__v).to.not.be.null;
        done();
      });
    });
  });

  describe('get /renters', () => {
    it('should get renters', (done) => {
      request(app)
      .get('/renters')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renters.length).to.equal(3);
        done();
      });
    });
  });

  describe('update /renters/:id/pay', () => {
    it('should update renter payment', (done) => {
      request(app)
      .put('/renters/012345678901234567891111/pay')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.renter.money).to.equal(8000);
        done();
      });
    });
  });
});
