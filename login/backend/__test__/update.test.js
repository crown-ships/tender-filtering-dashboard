const request = require('supertest');
const app = require('../app');
const db = require('./db');

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('POST /api/users Ideal Case', () => {
  it('It should update one user',  done => {
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
            agent.post('/api/user')
            .query('auth=true')
            .query('email=joe@gmail.com')
            .query('emailupdate=jack@gmail.com')
            .send({
              email: "john@gmail.com",
              role: "supervisor",
            })
            //.expect(200)
            .then(res => {
              const data = res.body;
                expect(data.data.email).toBe("john@gmail.com");
                expect(data.data.role).toBe("supervisor");
                expect(data.message).toBe("User has been updated");
                done();
            });
          });
      });
  });
});

//email [invalid]

//password [length, matching]

//different variation of inputs [make sure that each attribute is given once][email, password/password2, role, name]
//admin cannot update super-admin or admin

//staff-member or supervisor cannot update [access]
//tests for authentication
//^^^check this fro all necessary test files

// describe('POST /api/users Test Case: AUTH', () => {
//   it('It should NOT update a user: (Not Logged In)',  done => {
//     // Create a new user
//     agent
//       .post('/api/signup')
//       .send({
//         name: "joe",
//         email: "joe@gmail.com",
//         password: "123123",
//         password2: "123123",
//         role: "admin",
//         userRole: "admin",
//         createdBy: "60a39d5782cdd668b85db941",
//         authentication: true
//       })
//       .then(resp => {
//         agent
//           .post('/api/signup')
//           .send({
//             name: "jack",
//             email: "jack@gmail.com",
//             password: "123123",
//             password2: "123123",
//             role: "staff-member",
//             userRole: "admin",
//             createdBy: "60a39d5782cdd668b85db941",
//             authentication: true
//           })
//           .then(re => {
//             agent.post('/api/users')
//             .query('auth=false')
//             .query('email = joe@gmail.com')
//             .query('emailupdate = jack@gmail.com')
//             .expect(400)
//             .then(res => {
//               const data = res.body;
//                 expect(data.error).toBe("You need to be logged in to access this route");
//
//                 done();
//             });
//           });
//       });
//   });
// });
//
// describe('POST /api/users Test Case: ACCESS CONTROL', () => {
//   it('It should NOT update a user: (Permission Check: STAFF_MEMBER)',  done => {
//     // Create a new user
//     agent
//       .post('/api/signup')
//       .send({
//         name: "joe",
//         email: "joe@gmail.com",
//         password: "123123",
//         password2: "123123",
//         role: "admin",
//         userRole: "admin",
//         createdBy: "60a39d5782cdd668b85db941",
//         authentication: true
//       })
//       .then(resp => {
//         agent
//           .post('/api/signup')
//           .send({
//             name: "jack",
//             email: "jack@gmail.com",
//             password: "123123",
//             password2: "123123",
//             role: "staff-member",
//             userRole: "admin",
//             createdBy: "60a39d5782cdd668b85db941",
//             authentication: true
//           })
//           .then(re => {
//             agent.post('/api/users')
//             .query('auth=true')
//             .query('email = jack@gmail.com')
//             .query('emailupdate = joe@gmail.com')
//             .expect(401)
//             .then(res => {
//               const data = res.body;
//                 expect(data.error).toBe("You don't have enough permission to perform this action");
//
//                 done();
//             });
//           });
//       });
//   });
//
//   it('It should NOT update a user: (Permission Check: SUPERVISOR)',  done => {
//     // Create a new user
//     agent
//       .post('/api/signup')
//       .send({
//         name: "joe",
//         email: "joe@gmail.com",
//         password: "123123",
//         password2: "123123",
//         role: "supervisor",
//         userRole: "admin",
//         createdBy: "60a39d5782cdd668b85db941",
//         authentication: true
//       })
//       .then(resp => {
//         agent
//           .post('/api/signup')
//           .send({
//             name: "jack",
//             email: "jack@gmail.com",
//             password: "123123",
//             password2: "123123",
//             role: "staff-member",
//             userRole: "admin",
//             createdBy: "60a39d5782cdd668b85db941",
//             authentication: true
//           })
//           .then(re => {
//             agent.post('/api/users')
//             .query('auth=true')
//             .query('email=joe@gmail.com')
//             .query('emailupdate=jack@gmail.com')
//             .expect(401)
//             .then(res => {
//               const data = res.body;
//                 expect(data.error).toBe("You don't have enough permission to perform this action");
//
//                 done();
//             });
//           });
//       });
//   });
//
//   it('It should NOT update a user: (Permission Check: INVALID USER)',  done => {
//     // Create a new user
//     agent
//       .post('/api/signup')
//       .send({
//         name: "joe",
//         email: "joe@gmail.com",
//         password: "123123",
//         password2: "123123",
//         role: "super-admin",
//         userRole: "admin",
//         createdBy: "60a39d5782cdd668b85db941",
//         authentication: true
//       })
//       .then(resp => {
//         agent
//           .post('/api/signup')
//           .send({
//             name: "jack",
//             email: "jack@gmail.com",
//             password: "123123",
//             password2: "123123",
//             role: "staff-member",
//             userRole: "admin",
//             createdBy: "60a39d5782cdd668b85db941",
//             authentication: true
//           })
//           .then(re => {
//             agent.post('/api/users')
//             .query('auth=true')
//             .query('email=jim@gmail.com')
//             .query('emailupdate=jack@gmail.com')
//             .expect(401)
//             .then(res => {
//               const data = res.body;
//                 expect(data.error).toBe("You don't have enough permission to perform this action");
//
//                 done();
//             });
//           });
//       });
//   });
//
//   it('It should NOT update a user: (ADMIN updated SUPERADMIN)',  done => {
//     // Create a new user
//     agent
//       .post('/api/signup')
//       .send({
//         name: "joe",
//         email: "joe@gmail.com",
//         password: "123123",
//         password2: "123123",
//         role: "super-admin",
//         userRole: "admin",
//         createdBy: "60a39d5782cdd668b85db941",
//         authentication: true
//       })
//       .then(resp => {
//         agent
//           .post('/api/signup')
//           .send({
//             name: "jack",
//             email: "jack@gmail.com",
//             password: "123123",
//             password2: "123123",
//             role: "admin",
//             userRole: "admin",
//             createdBy: "60a39d5782cdd668b85db941",
//             authentication: true
//           })
//           .then(re => {
//             agent.post('/api/users')
//             .query('auth=true')
//             .query('email=jack@gmail.com')
//             .query('emailupdate=joe@gmail.com')
//             .expect(401)
//             .then(res => {
//               const data = res.body;
//                 expect(data.error).toBe("Action forbidden: Not allowed to change this user.");
//
//                 done();
//             });
//           });
//       });
//   });
// });
