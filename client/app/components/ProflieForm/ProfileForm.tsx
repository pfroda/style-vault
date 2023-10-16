'use client';
import './profileform.css'

import Header from '../Header/Header';
import GoBack from '../GoBack/GoBack';
import { User } from '@/app/Interfaces';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; 
import useAuth from '@/app/hooks/useAuth';

function ProfileForm() {
  const { register, handleSubmit } = useForm<User>();
  const router = useRouter();
  const { user, handleUpdate } = useAuth();

  const submitForm = handleSubmit(async (userData) => {
    console.log('hey user: ', user);
    const userId = user?.id!;
    console.log('userId:', userId);
    handleUpdate(userId, userData);
    router.push('/dashboard/cupboard');
  });

  return (
    <div className='ProfileForm'>
      <GoBack />
      <Header />
      <div className="user-form">
        <form onSubmit={submitForm} className='user-form'>
          {/* <div className="input-image-wrapper">
            <label htmlFor="profilePicture"></label>
            <div className="image-content">
              <div className="actual-img"></div>
              <input className='user-input-image' type="file" accept="image/*"
                {...register("profilePicture")} />
              <div className="change-img">Change picture</div>
            </div>
          </div> */}
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input className='user-input' type="text" {...register("username")} placeholder='Username' />
          </div>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input className='user-input' type="email" {...register("email")} placeholder='Email' />
          </div>
          <div className="input-wrapper">
            <label htmlFor="username">Password</label>
            <input className='user-input' type="password" {...register("password")} placeholder='Password' />
          </div>
          <div className="input-wrapper">
            <label htmlFor="name">Name</label>
            <input className='user-input' type="text" {...register("name")} placeholder='Name' />
          </div>
          <div className="input-wrapper">
            <label htmlFor="surname">Surname</label>
            <input className='user-input' type="text" {...register("surname")} placeholder='Surname' />
          </div>
          <button className='user-button' type="submit" >Submit changes</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm