import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 240,
  duration: '900s',
};

export default function () {
  const number = (Math.floor(Math.random() * 10000000));
  http.get('http://localhost:3000/photos/' + number);
  sleep(0.1);
}
