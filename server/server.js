import express from 'express';
import Test from './app';

const test = new Test();
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, (error) => {
  if (error) {
    process.stdout.write(error);
  }
  process.stdout.write('Testing in progress!', test);
});
