const request = require('supertest');
const app = require('../app');
const db = require('./db');

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('POST /api/user Ideal Case', () => {
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
              role: "supervisor"
            })
            .expect(200)
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

describe('POST /api/user Test Case: EMAIL', () => {
  it('It should NOT update one user: Email (Invalid)',  done => {
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
              email: "johngmail.com",
              role: "supervisor"
            })
            .expect(400)
            .then(res => {
              const data = res.body;
                expect(data.email).toBe("Email is invalid");
                done();
            });
          });
      });
  });
});

describe('POST /api/user Test Case: ROLE', () => {
  it('It should NOT update one user: Role (Invalid)',  done => {
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
              role: "supeisor"
            })
            .expect(400)
            .then(res => {
              const data = res.body;
                expect(data.role).toBe("Role is invalid.");
                done();
            });
          });
      });
  });
});

describe('POST /api/user Test Case: PASSWORD', () => {
  it('It should NOT update one user: Password (Length < 6)',  done => {
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
              password: "test",
              password2: "test"
            })
            .expect(400)
            .then(res => {
              const data = res.body;
                expect(data.password).toBe("Password must be between 6-30 characters");
                done();
            });
          });
      });
  });
  it('It should NOT update one user: Password (Length >30)',  done => {
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
              password: "test111111111111111111111111111111111111111111111111111111111111111111111111111111111",
              password2: "test111111111111111111111111111111111111111111111111111111111111111111111111111111111"
            })
            .expect(400)
            .then(res => {
              const data = res.body;
                expect(data.password).toBe("Password must be between 6-30 characters");
                done();
            });
          });
      });
  });
  it('It should NOT update one user: Password (Match)',  done => {
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
              password: "test213",
              password2: "test123"
            })
            .expect(400)
            .then(res => {
              const data = res.body;
                expect(data.password2).toBe("Passwords must match");
                done();
            });
          });
      });
  });
  it('It should update one user: Password (Correct input)',  done => {
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
              password: "test123",
              password2: "test123"
            })
            .expect(200)
            .then(res => {
              const data = res.body;
                expect(data.message).toBe("User has been updated");
                expect(data.data.password).toBe(data.data.password2);
                done();
            });
          });
      });
  });
});

describe('POST /api/user Test Case: NAME', () => {
  it('It should NOT update one user: Name (Numbers)',  done => {
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
              name: "john123"
            })
            //.expect(400)
            .then(res => {
              const data = res.body;
                expect(data.name).toBe("Name can only contain alphabets.");
                done();
            });
          });
      });
  });
  it('It should NOT update one user: Name (Special Char)',  done => {
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
              name: "~!@#$^&*&^%$#"
            })
            .expect(400)
            .then(res => {
              const data = res.body;
                expect(data.name).toBe("Name can only contain alphabets.");
                done();
            });
          });
      });
  });

  it('It should NOT update one user: Name (Special Char)',  done => {
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
              name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            })
            .expect(400)
            .then(res => {
              const data = res.body;
                expect(data.name).toBe("Name cannot exceed length of 50 characters.");
                done();
            });
          });
      });
  });
  it('It should NOT update one user: Name (Special Char)',  done => {
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
              name: "stevin"
            })
            .expect(200)
            .then(res => {
              const data = res.body;
                expect(data.data.name).toBe("stevin");
                done();
            });
          });
      });
  });
});

describe('POST /api/user Test Case: ACCESS CONTROL', () => {
  it('It should NOT update a user: (Permission Check: STAFF_MEMBER)',  done => {
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
            .query('email = jack@gmail.com')
            .query('emailupdate = joe@gmail.com')
            .send({
              email: "john@gmail.com",
              role: "supervisor"
            })
            .expect(401)
            .then(res => {
              const data = res.body;
                expect(data.error).toBe("You don't have enough permission to perform this action");

                done();
            });
          });
      });
  });
  it('It should NOT update a user: (Permission Check: SUPERVISOR)',  done => {
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
              role: "supervisor"
            })
            .expect(401)
            .then(res => {
              const data = res.body;
                expect(data.error).toBe("You don't have enough permission to perform this action");

                done();
            });
          });
      });
  });
  it('It should NOT update a user: (Permission Check: INVALID USER)',  done => {
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
            agent.post('/api/user')
            .query('auth=true')
            .query('email=jim@gmail.com')
            .query('emailupdate=jack@gmail.com')
            .send({
              email: "john@gmail.com",
              role: "supervisor"
            })
            .expect(401)
            .then(res => {
              const data = res.body;
                expect(data.error).toBe("You don't have enough permission to perform this action");

                done();
            });
          });
      });
  });
  it('It should NOT update a user: (ADMIN updates SUPERADMIN)',  done => {
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
            role: "admin",
            userRole: "admin",
            createdBy: "60a39d5782cdd668b85db941",
            authentication: true
          })
          .then(re => {
            agent.post('/api/user')
            .query('auth=true')
            .query('email=jack@gmail.com')
            .query('emailupdate=joe@gmail.com')
            .send({
              email: "john@gmail.com",
              role: "supervisor"
            })
            .expect(401)
            .then(res => {
              const data = res.body;
                expect(data.error).toBe("Action forbidden: Not allowed to change this user.");

                done();
            });
          });
      });
  });
});

describe('POST /api/user Test Case: AUTH', () => {
  it('It should NOT update a user: (Not Logged In)',  done => {
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
            .query('auth=false')
            .query('email=joe@gmail.com')
            .query('emailupdate=jack@gmail.com')
            .send({
              email: "john@gmail.com",
              role: "supervisor"
            })
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

//admin cannot update super-admin or admin

//staff-member or supervisor cannot update [access]

//tests for authentication

//^^^check this fro all necessary test files
