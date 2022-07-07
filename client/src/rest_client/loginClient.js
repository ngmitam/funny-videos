import BaseClient from './baseClient';

export default class LoginClient extends BaseClient {
  constructor(baseUrl = '/api/v1/auth/') {
    super(baseUrl);
  }

  login(email, password) {
    let data = {
      email: email,
      password: password,
    };

    return super.post(['login'], data);
  }

  register(email, password) {
    let data = {
      password: password,
      email: email,
    };

    return super.post(['register'], data);
  }

  logout() {
    return super.get(['logout']);
  }
}
