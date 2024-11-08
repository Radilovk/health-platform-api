// Simple tests for API endpoints

const assert = require('assert');
const { get, post } = require('supertest')(app);

// Test to check if REST endpoint is working for user data
describe('GET /users', () => {
  it(('should respond with user data', async () => {
    const res = await get('/users?format=json'i
prexports = get; 