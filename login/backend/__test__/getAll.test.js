const request = require('supertest');
const app = require('../app');
const db = require('./db');

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('GET /api/users Ideal Case', () => {
  it('It should return all users',  done => {
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
        .then(re => {
          agent.get('/api/users')
          .query('auth=true')
          .query('email=joe@gmail.com')
          .expect(200)
          .then(res => {
            const data = res.text;
            expect(data).toMatch(/_id/);
            done();
          });
        });
    });
  });

describe('GET /api/users Test Case: ACCESS CONTROL', () => {
  it('It should NOT get all users: (Permission Check: STAFF_MEMBER)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "staff-member",
        userRole: "admin",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .then(re => {
        agent.get('/api/users')
        .query('auth=true')
        .query('email=joe@gmail.com')
        .expect(401)
        .then(res => {
          const data = res.body;
          expect(data.error).toBe("You don't have enough permission to perform this action");
          done();
        });
      });
  });
  it('It should NOT get all users: (Permission Check: SUPERVISOR)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "supervisor",
        userRole: "admin",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .then(re => {
        agent.get('/api/users')
        .query('auth=true')
        .query('email=joe@gmail.com')
        .expect(401)
        .then(res => {
          const data = res.body;
          expect(data.error).toBe("You don't have enough permission to perform this action");
          done();
        });
      });
  });
  it('It should NOT get all users: (Permission Check: INVALID USER)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "super-admin",
        userRole: "admin",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .then(re => {
        agent.get('/api/users')
        .query('auth=true')
        .query('email=jim@gmail.com')
        .expect(401)
        .then(res => {
          const data = res.body;
          expect(data.error).toBe("You don't have enough permission to perform this action");
          done();
        });
      });
  });
});

describe('GET /api/users Test Case: AUTH', () => {
  it('It should NOT get all users: (Not Logged In)',  done => {
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
        agent
          .post('/api/signup')
          .send({
            name: "jack",
            email: "jack@gmail.com",
            password: "123123",
            password2: "123123",
            role: "staff-member",
            userRole: "admin",
            createdBy: "60a39d5782cdd668b85db941",
            authentication: true
          })
          .then(re => {
            agent.get('/api/users')
            .query('auth=false')
            .query('email=joe@gmail.com')
            .expect(400)
            .then(res => {
              const data = res.body;
                expect(data.error).toBe("You need to be logged in to access this route");

                done();
            });
          });
      });
  });
});
