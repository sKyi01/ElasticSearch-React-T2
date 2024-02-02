// Import React, useState, useEffect, axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styling for the component
const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '16px',
    color: '#333',
  },
  resultBox: {
    padding: '16px',
    border: '2px solid #007BFF',
    borderRadius: '8px',
    backgroundColor: '#f0faff',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '8px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
};

// Functional component
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/data');
      console.log('Fetched Data:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Data from Elasticsearch:</h1>
      <div style={styles.resultBox}>
        <ul style={styles.list}>
          {data.map(item => (
            <li key={item.id} style={styles.listItem}> 
              {`${item.name} - ${item.age}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
