import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react"; 

function Signin() {
    const [kcUsername, setkcUsername ] = useState("");
    const [password, setPassword ] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/auth/signin', { kcUsername, password });

            const { token, role, zone } = response.data;

            // Store the token and role in localStorage for session management
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('zone', zone);

            if (role === 'Teacher') {
                setMessage('Teachers are not allowed to access the Summit Registration dashboard.');
                alert("Teachers are not allowed to access the Summit Registration dashboard");
                navigate('/');  // Redirect teachers to a different page (home page)
            } else if (role === 'Principal') {
                setMessage('');
                navigate('/principalsdashboard');  // Redirect Principal to the Registration dashboard
            } else if (role === 'Admin') {
                setMessage('');
                navigate('/admin');  // Redirect Principal to the Registration dashboard
            } else {
                setMessage('Invalid role provided.');
                alert('Access denied: Invalid role.');
                navigate('/'); // Redirect to the home page or an error page for invalid roles
            }
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
        }
    };

  return (
    <div className="RegistrationPage">
        <h1>Principal/Teachers Login</h1>
        <input type="text" placeholder="Exp...Usermane123" onChange={(event) => setkcUsername(event.target.value)}/>
        <input type="password" placeholder="Exp...UPassword123" onChange={(event) => setPassword(event.target.value)}/>
        <button onClick={submit}>Signin</button>
        {message && <p>{message}</p>}
        <h3 onClick={(()=> navigate("/register"))}>Click here to Register</h3>
      
    </div>
  )
}

export default Signin
