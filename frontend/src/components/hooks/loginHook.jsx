import axios from "axios";
import { useAuthContext } from "../context/useAuthContext";
import React, { useState } from 'react';

const loginHook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/account/log-in', {
        email,
        password,
      });
      const json = response.data;
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
    } catch (err) {
      setError(err.response?.data?.error || 'An error happened!');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
}

export default loginHook;
