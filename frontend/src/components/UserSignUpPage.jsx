import React, { useState } from 'react'
import signUpHook from './hooks/signUpHook';

const UserSignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickName] = useState('');

  const {signup, error, isLoading} = signUpHook();

  const sendSignUpData = async (e) => {
    e.preventDefault();
    try {
      await signup(email,password,nickname)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-neutral-800">
      <section className="flex flex-col w-1/3 py-72 h-full items-center py-24 px-36 bg-neutral-700 rounded-3xl mt-20">
        <form onSubmit={sendSignUpData} className="flex flex-col justify-center space-y-6">
          <label className="font-semibold text-white text-2xl font-mono">E-mail</label>
          <input type="text" value={email} placeholder="E-mailiniz" onChange={(e) => setEmail(e.target.value)} className="rounded bg-slate-100 py-1 px-4" />
          <label className="font-semibold text-white text-2xl font-mono text-nowrap">Gözükmesini İstediğiniz Kullanıcı Adı</label>
          <input type="text" value={nickname} placeholder="Yorumlarda ve sosyalda gözükecek olan kullanıcı adınız" onChange={(e) => setNickName(e.target.value)} className="rounded bg-slate-100 py-1 px-4" />
          <label className="font-semibold text-white text-2xl font-mono">Şifre</label>
          <input type="password" value={password} placeholder="Şifreniz" onChange={(e) => setPassword(e.target.value)} className="rounded bg-slate-100 py-1 px-4"/>
          <div className="flex flex-col justify-center items-center">
           <button className="bg-slate-200 px-12 py-2 rounded-full font-semibold text-xl text-nowrap w-fit mt-5">Kayıt ol</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default UserSignUpPage
