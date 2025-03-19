import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
fetch("https://successful-amazement-production.up.railway.app/town-city-building-ca?url=https://example.com")    
      .then(response => response.json())
      .then(json => {
        console.log(json); // <-- Added for debugging
        setData(json);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI SEO Backend Test</h1>
      <button onClick={fetchData}>Fetch SEO Data</button>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Error: {error}
        </div>
      )}
      {data ? (
        <pre style={{ background: '#f4f4f4', padding: '20px', marginTop: '10px', borderRadius: '5px' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p style={{ marginTop: '10px' }}>No data yet.</p>
      )}
    </div>
  );
}

export default App;