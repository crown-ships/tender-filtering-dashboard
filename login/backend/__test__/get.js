// const request = require('supertest');
// const app = require('../app');
// const db = require('./db');
//
// // Pass supertest agent for each test
// const agent = request.agent(app);
//
// // Setup connection to the database
// beforeAll(async () => await db.connect());
// beforeEach(async () => await db.clear());
// afterAll(async () => await db.close());
//
// describe('GET /api/user Ideal Case', () => {
//   it('It should return one user',  done => {
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
//         agent.get('/api/user')
//         .query({email:"joe@gmail.com"})
//         .expect(200)
//         .then(res => {
//           const data = res.text;
//           expect(data).toMatch(/admin/);
//           done();
//         });
//       });
//   });
// });
