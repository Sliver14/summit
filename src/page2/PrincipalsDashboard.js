import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import jwtDecode from 'jwt-decode';

function PrincipalsDashboard() {
    const [regData, setRegData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [zone, setZone] = useState('');
    const [count, setCount] = useState("");
    const navigate = useNavigate();

    const logout = () => {
      const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('zone');
      localStorage.removeItem('role');
      navigate('/signin'); // Redirect to login page
    }
  };


    useEffect(() => {

        // Retrieve the `zone` from localStorage
        const zone = localStorage.getItem('zone');

        if (!zone) {
            setError('Zone not found');
            setLoading(false);
            return;
          }
          //column count
          axios.get(`http://localhost:3001/registration/count-users?zone=${zone}`).then((response => {
            setCount(response.data.totalUsersInZone)
          }))

        // Fetch users for the specified zone
        axios.get(`http://localhost:3001/registration/filter?zone=${zone}&limit=5&offset=10`).then((response) => {
            setRegData(response.data.data);
            setLoading(false);
            setZone(zone);
        }).catch((err) => {
            console.error('Error fetching users:', err);
            setError('Failed to fetch users');
            setLoading(false);
          });
      }, []);
    
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>{error}</p>;
      }
  return (
    
    <div>
        <h3> {zone} Dashboard</h3>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
        <h4>Total Registered : {count}</h4>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Middle Name</th>
                    <th>Country Code</th>
                    <th>Phone Number</th>
                    <th>Zone</th>
                    <th>Email</th>
                    
                </tr>
            </thead>
            <tbody>
                {regData.map((value, key) => {
                    return (
                        <tr key={value.id}>
                            <td>{value.id}</td>
                            <td>{value.firstName}</td>
                            <td>{value.lastName}</td>
                            <td>{value.middleName}</td>
                            <td>{value.countryCode}</td>
                            <td>{value.phoneNumber}</td>
                            <td>{value.zone}</td>
                            <td>{value.email}</td>
                        </tr>
                    
                    );
                    
                })}
            </tbody>
        </table>
      
    </div>
  )
}

export default PrincipalsDashboard
