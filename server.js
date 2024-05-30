import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const windowSize = 10;
let numbers = [];
let previousNumbers = [];

const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const fibonacci = (n) => {
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
};

const fetchNumbers = async (type) => {
  const url = `http://localhost:4001/numbers/${type}`;
  const response = await axios.get(url);
  return response.data.numbers;
};

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  let fetchedNumbers = [];

  try {
    switch (numberid) {
      case 'p':
        fetchedNumbers = (await fetchNumbers('prime')).filter(isPrime);
        break;
      case 'f':
        fetchedNumbers = (await fetchNumbers('fibonacci')).map(fibonacci);
        break;
      case 'e':
        fetchedNumbers = (await fetchNumbers('even')).filter((num) => num % 2 === 0);
        break;
      case 'r':
        fetchedNumbers = await fetchNumbers('random');
        break;
      default:
        res.status(400).send('Invalid number ID');
        return;
    }

    fetchedNumbers = [...new Set(fetchedNumbers)];

    previousNumbers = numbers.slice(); // Copy current numbers to previous numbers
    numbers.push(...fetchedNumbers);
    if (numbers.length > windowSize) {
      numbers = numbers.slice(numbers.length - windowSize);
    }

    const avg = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;

    res.json({
      windowPrevState: previousNumbers,
      windowCurrState: numbers,
      numbers: fetchedNumbers,
      avg: avg.toFixed(2),
    });
  } catch (error) {
    res.status(500).send('Error fetching numbers');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
