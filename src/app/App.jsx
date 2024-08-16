import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from '../pages/unauthorized/Home';
import AuthenticationComponent from '../pages/unauthorized/authentication/AuthenticationComponent';

const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthenticationComponent />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>}

      {/* {currentRole === "ADMIN" &&
        <>
          <AdminDashboard />
        </>
      }

      {currentRole === "USER" &&
        <>
          <UserDashboard />
        </>
      } */}

    </Router>
  )
}

export default App