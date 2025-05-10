export class AuthRequest {
  static loginUser = async ({ username, password }) => {
    const response = await fetch('http://192.168.50.167:3002/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    if (!response.ok || response.status === 401) {
      throw data;
    }
    return data;
  };

  static validateSession = async () => {
    const response = await fetch('http://192.168.50.167:3002/validate');
    const data = await response.json();
    if (!response.ok || response.status === 401) {
      throw data;
    }
    return data;
  };

  static logout = async () => {
    const response = await fetch('http://192.168.50.167:3002/logout', {
      method: 'POST',
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  };
}
