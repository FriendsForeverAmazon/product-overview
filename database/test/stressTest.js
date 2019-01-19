import http from 'k6/http';

export const options = {
  vus: 200,
  duration: '30s',
  rps: 10000,
};

export default function () {
  const number = (Math.floor(Math.random() * 10000000));
  http.get('http://localhost:3000/products/' + number);
}
