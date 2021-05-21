const request = require('supertest');
const app = require('../app');
const db = require('./db');

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('POST /api/signup Ideal Case', () => {
  it('It should create a new user: Expected input',  done => {
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
      .expect(200)
      .then(res => {
        const data = res.text;
        expect(data).toMatch(/User created/);
        done();
      });
  });
});

describe('POST /api/signup Test Case: EMAIL', () => {


  it('It should create a new user: with symbols',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "test.email.with+symbol@domain.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(200)
      .then(res => {
        expect(res.text).toMatch(/User created/)
        done();
      });
  });
  it('It should create a new user: with ONLY symbols',  done => {

  agent
    .post('/api/signup')
    .send({
      name: "joe",
      email: "#!$%&'*+-/=?^_{}|~@domain.org",
      password: "123123",
      password2: "123123",
      role: "admin",
      userRole: "staff-member",
      createdBy: "60a39d5782cdd668b85db941",
      authentication: true
    })
    .expect(200)
    .then(res => {
      expect(res.text).toMatch(/User created/)
      done();
    });
});
  it('It should NOT create a new user: Empty Email',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Email field is required/)
        done();
      });
  });
  it('It should NOT create a new user: Existing Email',  done => {
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
        agent.post('/api/signup')
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
        .expect(400)
        .then(res => {
          const data = res.text;
          expect(data).toMatch(/User already exists/);
          done();
        });
      });
  });
  it('It should NOT create a new user: Invalid Email (length)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Email is invalid/)
        done();
      });
  });
  it('It should NOT create a new user: Invalid Email (no .)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmailcom",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Email is invalid/)
        done();
      });
  });
  it('It should NOT create a new user: Invalid Email (no @)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joegmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Email is invalid/)
        done();
      });
  });
  it('It should NOT create a new user: Invalid Email (no domain)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Email is invalid/)
        done();
      });
  });
  it('It should NOT create a new user: Invalid Email (no name)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Email is invalid/)
        done();
      });
  });
  it('It should NOT create a new user: Invalid Email (..com)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail..com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Email is invalid/)
        done();
      });
  });
  it('It should NOT create a new user: Invalid Email (@@)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "joe",
        email: "joe@gmail@joe.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Email is invalid/)
        done();
      });
  });
});

describe('POST /api/signup Test Case: NAME', () => {

  it('It should create a new user: Name (with space)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "stevin sebastian",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(200)
      .then(res => {
        expect(res.text).toMatch(/User created/)
        done();
      });
  });

  it('It should NOT create a new user: Invalid Name (length)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Name cannot exceed length/)
        done();
      });
  });


  it('It should NOT create a new user: Name (with special chars)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "!as_+~~",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Name can only contain alphabets./)
        done();
      });
  });

  it('It should NOT create a new user: Name (with numbers)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "as12332",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Name can only contain alphabets./)
        done();
      });
  });

  it('It should NOT create a new user: Name (empty)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "",
        email: "joe@gmail.com",
        password: "123123",
        password2: "123123",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Name field is required./)
        done();
      });
  });
});

describe('POST /api/signup Test Case: PASSWORD', () => {

  it('It should NOT create a new user: Password (<6 digits)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "stevin sebastian",
        email: "joe@gmail.com",
        password: "1231",
        password2: "1231",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/between 6-30 characters/)
        done();
      });
  });

  it('It should NOT create a new user: Password (30< digits)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "stevin sebastian",
        email: "joe@gmail.com",
        password: "123111111111111111111111111111111111111111111111111111111111111111111111111",
        password2: "123111111111111111111111111111111111111111111111111111111111111111111111111",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/between 6-30 characters/)
        done();
      });
  });

  it('It should NOT create a new user: Password (Empty)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "stevin sebastian",
        email: "joe@gmail.com",
        password: "",
        password2: "123111111111111111111111111111111111111111111111111111111111111111111111111",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/Password field is required/)
        done();
      });
  });

  it('It should NOT create a new user: Password2 (Empty)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "stevin sebastian",
        email: "joe@gmail.com",
        password: "13212312",
        password2: "",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/must match/)
        done();
      });
  });

  it('It should NOT create a new user: Password2 (not match)',  done => {
    // Create a new user
    agent
      .post('/api/signup')
      .send({
        name: "stevin sebastian",
        email: "joe@gmail.com",
        password: "123123",
        password2: "12",
        role: "admin",
        userRole: "staff-member",
        createdBy: "60a39d5782cdd668b85db941",
        authentication: true
      })
      .expect(400)
      .then(res => {
        expect(res.text).toMatch(/must match/)
        done();
      });
  });
});

describe('POST /api/signup Test Case: ROLE', () => {

    it('It should NOT create a new user: Role (Empty)',  done => {
      // Create a new user
      agent
        .post('/api/signup')
        .send({
          name: "stevin sebastian",
          email: "joe@gmail.com",
          password: "123123",
          password2: "12",
          role: "",
          userRole: "staff-member",
          createdBy: "60a39d5782cdd668b85db941",
          authentication: true
        })
        .expect(400)
        .then(res => {
          expect(res.text).toMatch(/field is required/)
          done();
        });
    });

    it('It should NOT create a new user: Role (Invalid)',  done => {
      // Create a new user
      agent
        .post('/api/signup')
        .send({
          name: "stevin sebastian",
          email: "joe@gmail.com",
          password: "123123",
          password2: "12",
          role: "staffmamber",
          userRole: "staff-member",
          createdBy: "60a39d5782cdd668b85db941",
          authentication: true
        })
        .expect(400)
        .then(res => {
          expect(res.text).toMatch(/Role is invalid/)
          done();
        });
    });
});
