import React, { useEffect, useState } from 'react'
import { useAuthContext } from './context/useAuthContext'
import axios from 'axios';
import {Link} from 'react-router-dom'

const ProfilePage = () => {

  const [accountData, setaccountData] = useState({});

  const {account} = useAuthContext();

  const getaccountProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/account/get-account-profile-data/${account.token}`, {
        headers: {
          Authorization: `Bearer ${account.token}`
        }
      });
      console.log(response.data)
      setaccountData(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
      getaccountProfileData();
  }, [])

  return (
    <main className="w-full min-h-screen flex flex-col items-center px-80 bg-neutral-800">
      <div className="w-full h-full flex flex-row w-full items-center bg-neutral-700 rounded-xl">
       <section className="flex flex-col w-1/3 space-y-6 border-r-8 pr-10 py-10 border-black">
          <Link to="/account/reset-password" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Şifremi Sıfırla</Link>
          <Link to="/account/change-profile-picture" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Profil Resmini Değiştir</Link>
          <Link to="/account/make-a-donate" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Bağış Yap</Link>
          <Link to="/account/achievements" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Başarımlar</Link>
        </section>
        <section className="flex flex-col items-center ml-24">
          <h1 className="text-white font-semibold text-3xl">Yandaki navigasyon butonlarından istediğiniz yere ulaşabilirsiniz.</h1>
        </section>
      </div>
    </main>
  )
}

export default ProfilePage
