const request = require('supertest');
const app = require('../app');
const db = require('./db');

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('POST /api/login Ideal Case', () => {
  it('It should login the user',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "admin",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .then(resp => {
        agent.post('/api/login')
        .send({
          email: "joe@gmail.com",
          password: "123123"
        })
        .expect(200)
        .then(res => {
          const data = res.text;
          expect(data).toMatch(/Bearer/);
          done();
        });
      });
  });
});

//check for email [invalid, empty, does not exist]
//check for passowrd [empty, incorrect]
describe('POST /api/login Test Case: EMAIL', () => {
  it('It should NOT login the user: Email (invalid)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "admin",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .then(resp => {
        agent.post('/api/login')
        .send({
          email: "joegmail.com",
          password: "123123"
        })
        .expect(400)
        .then(res => {
          const data = res.text;
          expect(data).toMatch(/Email is invalid/);
          done();
        });
      });
  });
  it('It should NOT login the user: Email (empty)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "admin",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .then(resp => {
        agent.post('/api/login')
        .send({
          email: "",
          password: "123123"
        })
        .expect(400)
        .then(res => {
          const data = res.text;
          expect(data).toMatch(/field is required/);
          done();
        });
      });
  });
  it('It should NOT login the user: Email (Not exist)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "admin",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .then(resp => {
        agent.post('/api/login')
        .send({
          email: "joseph@gmail.com",
          password: "123123"
        })
        .expect(400)
        .then(res => {
          const data = res.text;
          expect(data).toMatch(/does not exist/);
          done();
        });
      });
  });
});

describe('POST /api/login Test Case: PASSWORD', () => {
  it('It should NOT login the user: Password (Empty)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "admin",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .then(resp => {
        agent.post('/api/login')
        .send({
          email: "joe@gmail.com",
          password: ""
        })
        .expect(400)
        .then(res => {
          const data = res.text;
          expect(data).toMatch(/Password field is required/);
          done();
        });
      });
  });
  it('It should NOT login the user: Password (Incorrect)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "admin",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .then(resp => {
        agent.post('/api/login')
        .send({
          email: "joe@gmail.com",
          password: "1231"
        })
        .expect(400)
        .then(res => {
          const data = res.text;
          expect(data).toMatch(/Password is incorrect/);
          done();
        });
      });
  });
});
