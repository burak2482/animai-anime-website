import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import { useAuthContext } from '../context/useAuthContext';

const ChangeProfilePicture = () => {
  const [userData, setUserData] = useState({});
  const [userPhotoPreview, setUserPhotoPreview] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  const {user} = useAuthContext();

  const getUserProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/account/get-user-profile-data/${user.token}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      console.log(response.data)
      setUserData(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
      getUserProfileData();
  }, [])

  const handlePreviewPhoto = async (e) => {
    const file = e.target.files[0]
    setUserPhoto(file);
    console.log(userPhoto);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file)  
    }
  };

  const sendUserProfileData = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('photo', userPhoto);
  
      await axios.post(
        `http://localhost:5000/account/update-user-profile-photo/${user.token}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
        <main className="w-full min-h-screen flex flex-col items-center px-80 bg-neutral-800">
          <div className="w-full h-full flex flex-row w-full items-center bg-neutral-700 rounded-xl">
            <section className="flex flex-col w-1/3 space-y-6 border-r-8 pr-10 py-24 border-black">
                <h1 className="font-bold text-3xl font-customFjalla text-center text-black tracking-wider py-1 bg-white rounded-r-2xl">Navigasyon</h1>
                <Link to="/account/reset-password" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Şifremi Sıfırla</Link>
                <Link to="/account/change-profile-picture" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Profil Resmini Değiştir</Link>
                <Link to="/account/make-a-donate" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Bağış Yap</Link>
                <Link to="/account/achievements" className="text-white font-semibold text-2xl bg-neutral-900 rounded-r-xl px-5">Başarımlar</Link>
              </section>
              <section className="flex flex-col justify-center items-center px-96 ml-36">
                <form className="absolute flex flex-col justify-center items-center border-4 py-10 px-10 space-y-6 rounded-3xl" onSubmit={sendUserProfileData}>
                  <h1 className="text-white font-semibold text-3xl mb-5">Kullanıcı Bilgileri</h1>
                  <div className="flex flex-row items-center border-b-2 w-full">
                    <label className="font-semibold font-customFjalla text-xl text-white mr-5 mb-2"><span className="font-semibold text-2xl font-sans mr-2">Kullanıcı adı:</span>{userData.nickname}</label>
                  </div>
                  <div className="flex flex-row items-center border-b-2 w-full">
                    <h1 className="font-semibold text-2xl font-sans text-white mr-6 mb-2">Yetki:</h1>
                    <label className={`border-4 text-xl px-6 py-1 font-customFjalla font-bold rounded-xl mb-2 ${userData.role === 'admin' ? "border-red-800 text-red-800" : "border-blue-700 text-blue-400"}`}>{userData.role}</label>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <img src={userPhotoPreview ? userPhotoPreview : userData.photo} className="w-16 h-16 rounded-full object-cover"/>
                      <label className="font-semibold text-white text-3xl">
                        <input type="file" className="hidden" onChange={handlePreviewPhoto}></input>
                        <div className="px-4 py-2 bg-neutral-900 text-2xl text-white rounded rounded-r-xl ml-4 text-nowrap">Fotoğraf Yükle</div>
                       </label>
                  </div>
                  <button className="relative bottom-0 bg-neutral-900 text-white text-lg px-6 py-1 font-semibold rounded-full mb-5">Değişiklikleri Kaydet</button>
                </form>
              </section>
          </div>
      </main>
  )
}

export default ChangeProfilePicture
