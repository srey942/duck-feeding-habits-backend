const request = require('supertest');
const app = require('../app');
const agent = request.agent(app);

describe('Happy path for endpoints', () => {
  beforeAll((done) => {
    app.on('appStarted', function () {
      done();
    });
  });

  it('should create a new entry', async (done) => {
    const res = await agent.post('/addFoodDetails').send({
      'Type of Food': 'rice',
      'Place of Food Feed': 'ponds',
      'Quantity Fed': '2 lbs',
      'Number of Ducks Fed': '2',
      'Time of Feed': 'Tue, 21 Apr 2021 16:25:41 PST',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toEqual(true);
    done();
  });

  it('should fetch created entries', async (done) => {
    const res = await agent.get('/getFoodDetails');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    done();
  });

  it('should fetch schema from CMS and return the fields', async (done) => {
    const res = await agent.get('/getFormFields');
    const response = res.body;
    expect(res.statusCode).toEqual(200);
    expect(response.items.length).toBeGreaterThan(0);
    expect(response.total).toBeGreaterThan(0);
    done();
  });
});
