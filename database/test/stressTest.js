import http from 'k6/http';

export const options = {
  vus: 100,
  duration: '120s',
  rps: 5000,
};

const number1 = Math.floor(Math.random() * 10000000);
const number2 = Math.floor(Math.random() * 10000);
const number3 = Math.floor(Math.random() * 1000);
const number4 = Math.floor(Math.random() * 100);
const number5 = Math.floor(Math.random() * 100);


export default function () {
  http.get('http://52.53.167.47:3000/products/' + number1);
  http.get('http://52.53.167.47:3000/products/' + number2);
  http.get('http://52.53.167.47:3000/products/' + number3);
  http.get('http://52.53.167.47:3000/products/' + number4);
  http.get('http://52.53.167.47:3000/products/' + number5);
  http.get('http://52.53.167.47:3000/photos/' + number1);
  http.get('http://52.53.167.47:3000/photos/' + number2);
  http.get('http://52.53.167.47:3000/photos/' + number3);
  http.get('http://52.53.167.47:3000/photos/' + number4);
  http.get('http://52.53.167.47:3000/photos/' + number5);
}
