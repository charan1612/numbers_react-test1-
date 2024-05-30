import React, { useState } from 'react';

const Authorisation = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const authorise = async () => {
    const url = "http://20.244.56.144/test/auth";
    const data = {
      companyName: "Affordmed",
      clientID: "5bdb0284-bece-4b64-8e92-2f1f520c588b",
      clientSecret: "RvHRKvAYkRbVMzLd",
      OwnerName: "Saicharan",
      OwnerEmail: "parugula.saicharan@gmail.com",
      rollNo: "21BD1A665M"
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
      <button onClick={authorise}>Authorisation</button>
      {response && <div>Success: {JSON.stringify(response)}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Authorisation;
