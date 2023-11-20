const SERVER_URL = '/api';

const API_ROUTES = {
  users: `${SERVER_URL}/users`,
  roles: `${SERVER_URL}/roles`,
  materials: `${SERVER_URL}/materials`,
  movements: `${SERVER_URL}/movements`
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { API_ROUTES, SERVER_URL, fetcher };
