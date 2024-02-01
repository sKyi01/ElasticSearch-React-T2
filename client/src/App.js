import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/data');
      console.log('Fetched Data:', response.data); // Log the fetched data
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Data from Elasticsearch:</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{`${item.name} - ${item.age}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
