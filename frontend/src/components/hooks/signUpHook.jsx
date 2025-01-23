import React, { useState } from 'react'
import { useAuthContext } from '../context/useAuthContext';
import axios from 'axios';

const signUpHook = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {dispatch} = useAuthContext();

  const signup = async (email,password,nickname) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/account/sign-up', {
        email,
        password,
        nickname,
      })
      const json = response.data
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({type: "LOGIN", payload: json})
    } catch (err) {
      console.log(err.response?.data?.error || 'An error happened!')
    } finally {
      setIsLoading(false);
    }
  }

  return {signup, error, isLoading}
 
}

export default signUpHook
