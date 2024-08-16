import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from '../pages/unauthorized/Home';
import AuthenticationComponent from '../pages/unauthorized/authentication/AuthenticationComponent';
import Notification from './components/notification/Notification';
import { UserDashboard } from '../pages/user/UserDashboard';

const App = () => {
  const { rol } = useSelector(state => state.user);

  console.log(rol);

  return (
    <>
      <Notification />
      <Router>
        {((rol === null) || (rol === undefined)) &&
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
      */}

        {rol === "USER" &&
          <>
            <UserDashboard />
          </>
        }

      </Router>
    </>
  )
}

export default App