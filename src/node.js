const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const windowSize = 10;
let numbers = [];

// Function to check if a number is prime
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to generate the nth Fibonacci number
const fibonacci = (n) => {
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
};

// Function to fetch numbers from a third-party API
const fetchNumbers = async (type) => {
  const url = `http://third-party-server.com/numbers/${type}`;
  const response = await axios.get(url);
  return response.data.numbers;
};

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  let fetchedNumbers = [];

  try {
    // Fetch numbers based on the type
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
        return res.status(400).send('Invalid number ID');
    }

    // Ensure numbers are unique
    fetchedNumbers = [...new Set(fetchedNumbers)];

    // Add numbers to the window
    numbers.push(...fetchedNumbers);
    if (numbers.length > windowSize) {
      numbers = numbers.slice(numbers.length - windowSize);
    }

    // Calculate average
    const avg = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;

    // Respond with the current state
    res.json({
      windowPrevState: numbers.slice(0, numbers.length - fetchedNumbers.length),
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


export default node