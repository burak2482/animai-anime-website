import React, { useState } from 'react'
import axios from 'axios'
import loginHook from './hooks/loginHook';

const UserLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, error, isLoading} = loginHook();

  const sendUserData = async (e) => {
    e.preventDefault();

    try {
      await login(email,password)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-neutral-800">
      <section className="flex flex-col w-1/3 py-72 h-full items-center py-24 px-36 bg-neutral-700 rounded-3xl mt-20">
        <form onSubmit={sendUserData} className="flex flex-col justify-center space-y-6">
          <label className="font-semibold text-white text-3xl font-mono">E-mail</label>
          <input 
            type="text" 
            placeholder="E-mailiniz" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="rounded bg-slate-100 py-1 px-4"
          />
          <label className="font-semibold text-white text-3xl font-mono">Şifre</label>
          <input 
            type="password" 
            placeholder="Şifreniz" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="rounded bg-slate-100 py-1 px-4"
          />
          <div className="flex justify-center px-24">
            <button 
              className="bg-slate-200 px-12 py-2 rounded-full font-semibold text-xl text-nowrap w-fit"
            >
              Giriş yap
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default UserLoginPage
