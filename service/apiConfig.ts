const SERVER_URL = '/api';

const API_ROUTES = {
  users: `${SERVER_URL}/users`,
  roles: `${SERVER_URL}/roles`,
  lots: `${SERVER_URL}/lots`,
  collections: `${SERVER_URL}/collections`,
  shipments: `${SERVER_URL}/shipments`,
  shipmentSummary: `${SERVER_URL}/shipments/summary`,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { API_ROUTES, SERVER_URL, fetcher };
