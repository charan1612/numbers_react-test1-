import express from 'express';
const app = express();
const PORT = 4001;

const generateRandomNumbers = (count, min, max) => {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return numbers;
};

app.get('/numbers/:type', (req, res) => {
  const { type } = req.params;
  let numbers = [];

  switch (type) {
    case 'prime':
      numbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]; // Sample prime numbers
      break;
    case 'fibonacci':
      numbers = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]; // Sample Fibonacci numbers
      break;
    case 'even':
      numbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]; // Sample even numbers
      break;
    case 'random':
      numbers = generateRandomNumbers(10, 1, 100); // Generate 10 random numbers between 1 and 100
      break;
    default:
      res.status(400).send('Invalid type');
      return;
  }

  res.json({ numbers });
});

app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});
