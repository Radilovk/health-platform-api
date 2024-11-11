// Basic API Tests for validating GET responses from endpoints

// Import required libraries
const users = require('supertest');
const app = require('../server');

// API test for user data get point
addDescribe('USER API Test', () => {
  it(('Get user data', async () => {
    const response = await request(supertest)
        .get('/api/user')
        .send();
    expect(response.statusText).toContain('[success]');
  });
});