const request = require('supertest');
const app = require('../app');
const db = require('./db');

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('GET /api/user Ideal Case', () => {
  it('It should return one user',  done => {
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
            agent.get('/api/user')
            .query('auth=true')
            .query('email=jack@gmail.com')
            .expect(200)
            .then(res => {
              const data = res.body;
                expect(data.data.email).toBe("jack@gmail.com");
                expect(data.data.role).toBe("staff-member");
                done();
            });
          });
      });
  });
});


describe('GET /api/user Test Case: AUTH', () => {
  it('It should NOT return one user info: (Not Logged In)',  done => {
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
            agent.get('/api/user')
            .query('auth=false')
            .query('email=jack@gmail.com')
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

describe('GET /api/user Test Case: ACCESS CONTROL', () => {
  it('It should return one user info: (Permission Check: STAFF_MEMBER)',  done => {
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
            agent.get('/api/user')
            .query('auth=true')
            .query('email=jack@gmail.com')
            .expect(200)
            .then(res => {
              const data = res.body;
                expect(data.data.role).toBe("staff-member");

                done();
            });
          });
      });
  });
  it('It should return one user info: (Permission Check: SUPER-ADMIN)',  done => {
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
            agent.get('/api/user')
            .query('auth=true')
            .query('email=joe@gmail.com')
            .expect(200)
            .then(res => {
              const data = res.body;
                expect(data.data.role).toBe("super-admin");

                done();
            });
          });
      });
  });
  it('It should NOT return one user info: (Permission Check: INVALID USER)',  done => {
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
            agent.get('/api/user')
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
});
