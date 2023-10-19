'use client';
import './profileform.css'
import Header from '../Header/Header';
import GoBack from '../GoBack/GoBack';
import Image from 'next/image';
import { useState } from 'react';
import { User } from '@/app/Interfaces';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; 
import { uploadPhotoToCloudinary } from "@/app/services/apiCloudinary";
import useAuth from '@/app/hooks/useAuth';
import defaultUserImage from '../../../public/user.png';

function ProfileForm() {
  const { register, handleSubmit } = useForm<User>();
  const router = useRouter();
  const { user, handleUpdate } = useAuth();

  const [itemUrl, setItemUrl] = useState<string | null>(null);

  const submitForm = handleSubmit(async (userData) => {
    try {
      const selectedFile = userData.profilePicture[0];
      let imageUrl = null;
      if (selectedFile) {
        imageUrl = await uploadPhotoToCloudinary(selectedFile);
        if (!imageUrl) {
          console.error('Error uploading photo to Cloudinary');
          return;
        }
      }
      setItemUrl(imageUrl);
      const userId = user?.id!;
      userData.profilePicture = imageUrl;
      handleUpdate(userId, userData);
      router.push('/dashboard/cupboard');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });
  

  return (
    <div className='ProfileForm'>
      <GoBack />
      <Header />
      <div className="user-form">
        <form onSubmit={submitForm} className='user-form'>
          <div className="input-image-wrapper">
            <label htmlFor="profilePicture"></label>
            <div className="image-content">
              {/* {user?.profilePicture ? <img src={user.profilePicture} alt="" className='actual-img' /> : <div className="actual-img"></div>} */}
              <Image className="actual-img" alt="" src={user?.profilePicture || defaultUserImage} width={100} height={100} />
              <input className='user-input-image' type="file" accept="image/*"
                {...register("profilePicture")} />
              <div className="change-img">Change picture</div>
            </div>
          </div>
          <div className="input-wrapper-profile">
            <label htmlFor="username">Username</label>
            <input className='user-input' type="text" {...register("username")} defaultValue={user?.username || ''} />
          </div>
          <div className="input-wrapper-profile">
            <label htmlFor="username">Email</label>
            <input className='user-input' type="email" {...register("email")}  defaultValue={user?.email || ''} />
          </div>
          <div className="input-wrapper-profile">
            <label htmlFor="username">Password</label>
            <input className='user-input' type="password" {...register("password")} />
          </div>
          <div className="input-wrapper-profile">
            <label htmlFor="name">Name</label>
            <input className='user-input' type="text" {...register("name")} defaultValue={user?.name || ''} />
          </div>
          <div className="input-wrapper-profile">
            <label htmlFor="surname">Surname</label>
            <input className='user-input' type="text" {...register("surname")} defaultValue={user?.surname || ''} />
          </div>
          <button className='user-button' type="submit" >Submit changes</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm