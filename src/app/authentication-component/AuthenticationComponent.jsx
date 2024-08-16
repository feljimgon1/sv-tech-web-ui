import React from 'react'

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import {
  Card, 
  Box,
  Tab
} from '@mui/material';

import './authentication-component.scss'
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';

const AuthenticationComponent = () => {

  const [value, setValue] = React.useState('login');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='authentication-container'>
      <Card className='card'>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="auth method">
                <Tab label="Login" value="login" />
                <Tab label="Register" value="register" />
              </TabList>
            </Box>
            <TabPanel value="login">
              <LoginForm />
            </TabPanel>
            <TabPanel value="register">
              <RegisterForm />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </div>
  )
}

export default AuthenticationComponent