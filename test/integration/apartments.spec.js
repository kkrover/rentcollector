/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');
// const Apartment = require('../../dst/models/apartment');

describe('rentcollector', () => {
  beforeEach((done) => {
    cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
      done();
    });
  });

  describe('post /apartments', () => {
    it('should create an apartment', (done) => {
      request(app)
      .post('/apartments')
      .send({ name: 'A1', sqft: 800, bedrooms: 1,
              floor: 1, rent: 750,
       })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartment.__v).to.not.be.null;
        done();
      });
    });
  });

  describe('get /apartments', () => {
    it('should get apartment', (done) => {
      request(app)
      .get('/apartments')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartments.length).to.equal(5);
        done();
      });
    });
  });

  describe('update /apartments/:id/lease', () => {
    it('should update apartment', (done) => {
      request(app)
      .put('/apartments/012345678901234567890011/lease')
      .send({ renter: '012345678901234567444411',
      })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartment.renter).to.equal('012345678901234567444411');
        done();
      });
    });
  });

  describe('get /apartments query', () => {
    it('should get apartments with 3 rooms and 800 sqft, sorted by price in ascending order', (done) => {
      request(app)
      .get('/apartments?filter[bedrooms]=3&filter[sqft]=800&sort[rent]=1')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartments.length).to.equal(2);
        expect(rsp.body.apartments[0].rent).to.equal(1450);
        done();
      });
    });
  });

  describe('get vacant /apartments query', () => {
    it('should get all of the vacant apartments', (done) => {
      request(app)
      .get('/apartments?sort[rent]=1&filter[vacant]=true')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartments.length).to.equal(4);
        expect(rsp.body.apartments[0].rent).to.equal(850);
        done();
      });
    });
  });

  describe('get occupied /apartments query', () => {
    it('should get all of the vacant apartments', (done) => {
      request(app)
      .get('/apartments?sort[rent]=1&filter[vacant]=false')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartments.length).to.equal(1);
        done();
      });
    });
  });

  describe('get info /apartments query', () => {
    it('should get apartments sqfts, sorted by price in ascending order', (done) => {
      request(app)
      .get('/apartments?filter[sqft]=850&sort[rent]=1')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        expect(rsp.body.apartments.length).to.equal(4);
        expect(rsp.body.apartments[0].rent).to.equal(1450);
        done();
      });
    });
  });
});
