import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import zones from "../utils/zones";

function Admin() {
    const [data, setData] = useState([]); // Holds the zone and count data
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/registration/countmanyusers?zone=${zones}`, {
          params: { zones: JSON.stringify(zones) },
        });
        setData(response.data); // Set the data to state
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Count by Zone</h1>
      <table>
        <thead>
          <tr>
            <th>Zone</th>
            <th>Number of Registered Users</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(({ zone, count }) => (
              <tr key={zone}>
                <td>{zone}</td>
                <td>{count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default Admin
