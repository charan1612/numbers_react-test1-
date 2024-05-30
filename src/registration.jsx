import React, { useState } from 'react';

const Register = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const register = async () => {
    const url = "http://20.244.56.144/test/register";
    const data = {
      companyName: "Affordmed",
      OwnerName: "Saicharan",
      rollNo: "21BD1A665M",
      OwnerEmail: "parugula.saicharan@gmail.com",
      accessCode: "osDvxf"
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button onClick={register}>Register</button>
      {response && <div>Success: {JSON.stringify(response)}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Register;
