import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './page2/Register';
import Signin from './page2/Signin';
import SummitFlyer from './pages/SummitFlyer';
import RegistrationPage from './pages/RegistrationPage';
import PrincipalsDashboard from './page2/PrincipalsDashboard';
import Admin from './page2/Admin';
import Ccss from "./pages/Ccss";

// import axios from "axios";
// import { Link } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
  return (
    <Router>      
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/create-flyer" element={<SummitFlyer />} />
        {/* <Route path="/registrationpage" element={<RegistrationPage />} /> */}
        <Route path="/principalsdashboard" element={<PrivateRoute><PrincipalsDashboard /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/ccss" element={<Ccss />} />
      </Routes>
    </Router>
  );
}

export default App;
