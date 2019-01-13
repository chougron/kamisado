import axios from 'axios';

export async function call(method: string, url: string, params: object) {
  const finalUrl = `${process.env.API_URL}/api${url}`;

  switch (method) {
    case 'GET':
      return axios.get(finalUrl);
    case 'POST':
      return axios.post(finalUrl, params);
  }

  return null;
}
