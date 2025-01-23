import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useAsyncError} from 'react-router-dom'
import { useAuthContext } from '../context/useAuthContext';

const ChangeCurrentPassword = () => {

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  const {user} = useAuthContext();

  const sendPasswordData = async (e) => {
    e.preventDefault();
 
    if (password !== rePassword) {
      return setError('Girilen şifreler birbiriyle aynı değil.')
    }
 
    try {
      const response = await axios.post(
        `http://localhost:5000/account/reset-user-password/${user.token}`, 
        { password }
      );
      setError('Şifre başarıyla değiştirildi!');
    } catch (err) {
      console.error('Frontend error:', err.response?.data);
      setError(err.response?.data?.message || 'Şifre değiştirilirken bir yanlışlık meydana geldi.');
    }
 }

  return ( 
    <main className="w-full min-h-screen flex flex-col items-center px-80 bg-neutral-800">
      <div className="w-full h-full flex flex-row w-full items-center bg-neutral-700 rounded-xl">
       <section className="flex flex-col w-1/2 space-y-6 border-r-8 pr-10 py-32 border-black">
          <h1 className="font-bold text-3xl font-customFjalla text-center text-black tracking-wider py-1 bg-white rounded-r-2xl">Navigasyon</h1>
          <Link to="/account/reset-password" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Şifremi Sıfırla</Link>
          <Link to="/account/change-profile-picture" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Profil Resmini Değiştir</Link>
          <Link to="/account/make-a-donate" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Bağış Yap</Link>
          <Link to="/account/achievements" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Başarımlar</Link>
        </section>
        <section className="flex flex-col items-center ml-24 w-full h-full py-5">
          <div className="flex flex-col justify-center items-center border-4 w-1/3 rounded-3xl">
            <h1 className="text-white font-semibold text-3xl mt-10">Şifreni Değiştir</h1>
            <form className="flex flex-col justify-center space-y-6 py-10" onSubmit={sendPasswordData}>
              <label className="text-white font-semibold text-xl">Yeni Şifre</label>
              <input type="text" placeholder='Yeni şifreniz..' value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-200 rounded px-10"/>
              <label className="text-white font-semibold text-xl">Yeni şifre tekrarı</label>
              <input type="text" placeholder='Yeni şifreniz tekrarı..' value={rePassword} onChange={(e) => setRePassword(e.target.value)} className="bg-slate-200 rounded px-10 mb-5" />
              <div className="px-10 mt-10">
               <button type="submit" className="px-6 py-2 bg-neutral-900 text-white font-semibold rounded-full">Değişiklikleri kaydet</button>
              </div>
              {error ? <div className={`font-semibold text-white px-2 text-nowrap py-2 rounded text-sm ${error.includes('!') ? "bg-green-500" : "bg-red-700"}`}>{error}</div> : null}
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ChangeCurrentPassword
