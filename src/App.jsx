import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState(null);
  const [numberId, setNumberId] = useState('');

  const fetchNumbers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/numbers/${numberId}`);
      setResponse(response.data);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <label htmlFor="numberId">Number ID:</label>
      <input
        type="text"
        id="numberId"
        value={numberId}
        onChange={(e) => setNumberId(e.target.value)}
      />
      <button onClick={fetchNumbers}>Calculate Average</button>
      {response && (
        <div>
          <h2>Previous Numbers:</h2>
          <ul>
            {response.windowPrevState.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
          <h2>Current Numbers:</h2>
          <ul>
            {response.windowCurrState.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
          <h2>New Numbers:</h2>
          <ul>
            {response.numbers.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
          <h2>Average:</h2>
          <p>{response.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;
