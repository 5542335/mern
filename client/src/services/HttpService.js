import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class HttpService {
  constructor(headers = {}) {
    this.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      ...headers,
    };
    this.token = cookies.get('token');
  }

  async get(url) {
    return this.send(url, null, 'GET');
  }

  async post(url, body) {
    return this.send(url, body, 'POST');
  }

  async put(url, body) {
    return this.send(url, body, 'PUT');
  }

  async patch(url, body) {
    return this.send(url, body, 'PATCH');
  }

  async delete(url, body) {
    return this.send(url, body, 'DELETE');
  }

  async send(url, body, method) {
    const response = await fetch(`${url}?token=${this.token}`, {
      body,
      headers: this.headers,
      method,
    });

    if (!response.ok) {
      throw new Error({ message: response.message, status: response.status });
    }

    return response.json();
  }
}
