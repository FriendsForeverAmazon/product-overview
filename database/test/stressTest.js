import http from 'k6/http';

export const options = {
  vus: 100,
  duration: '600s',
  rps: 5000,
};

const number1 = Math.floor(Math.random() * 10000000);
const number2 = Math.floor(Math.random() * 10000);
const number3 = Math.floor(Math.random() * 1000);
const number4 = Math.floor(Math.random() * 100);
const number5 = Math.floor(Math.random() * 100);


export default function () {
  http.get('http://localhost:3000/products/' + number1);
  http.get('http://localhost:3000/products/' + number2);
  http.get('http://localhost:3000/products/' + number3);
  http.get('http://localhost:3000/products/' + number4);
  http.get('http://localhost:3000/products/' + number5);
}
