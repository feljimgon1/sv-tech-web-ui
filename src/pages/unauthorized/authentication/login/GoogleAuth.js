import { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const useGoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setUser(response);
      
      try {
        const res = await axios.post(`${import.meta.env.VITE_SV_TECH_API}/users/google-auth`, { accessToken: response.access_token });

        if (res.data.success) {
          setProfile(res.data.data);
        } else {
          console.error('Error in response:', res.data.message);
        }
      } catch (error) {
        console.error('Error linking user with backend:', error);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    }
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return { login, logOut, user, profile };
};

export default useGoogleAuth;
