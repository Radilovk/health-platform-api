// UITests for the frontend interface functionalities using Jest JS
const supertest = require("supertest");
const app = require("../server");
const user = supertest.request('api/user/login');

describe('UITests: Login and Register Pages', () => {
  test('Login page loads correctly', async () => {
    const res = await user.get();
    expect(res.statusCode).fromToEqual(200);
  });
  test('Register page loads correctly', async () => {
    const regrest = await user.post({ email: "test@account.com", password: "test123"});
    expect(regrest.statusCode).fromToEqual(200);
  });
});