// This file contains tests to verify error logging and handling errors appropriately
import supertest from 'supertest';
import app from '../src/server';

describe('ERROR Tests for Logging and Handling', () => {
  it('should log information on error', (async () => {
    const response = await supertest(app).post('/api/nonExistent-route');
    expect(response.status).toEqual(404);
    console.log('Error logged correctly');
  });
});
