// Tests for all api endpoints and additional validation suites
import supertest from 'supertest';
import app from '../src/server';

describe('API Tests for All Endpoints', () => {
  it('gets user profile data', async () => {
    const res = await supertest(req1).get('/api/profile/123');
    expect(res.status).toEqual(200);
    expect(res.body.email).toEqual("test@email.com");
  });
  it('checks invalid user login data', async () => {
    const res = await supertest(app).post('/api/login', { email: 'invalid', password: 'badPass' });
    expect(res.status).toEqual(400);
    expect(res.body.error.type).toEmptyObject();
  });
});