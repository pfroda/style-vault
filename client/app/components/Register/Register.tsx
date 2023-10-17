'use client';
import './register.css';
import homeimage from '../../../public/home-image.png';
import logo from '../../../public/logo3.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import { RegisterUser } from '@/app/Interfaces';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import useAuth from '@/app/hooks/useAuth';

function Register() {
  const { register, handleSubmit } = useForm<RegisterUser>();
  const { user, handleRegister } = useAuth();

  const router = useRouter();

  const submitForm = handleSubmit(async (user: RegisterUser) => {
    handleRegister(user);
    router.push('/home');
  });

  return (
    <div className="register-page-container">
      <Image src={logo} alt="" className='logo-image' />
      <Image src={homeimage} alt="" className='home-image' />
      <div className="register-page">
        <form onSubmit={submitForm} className='register-form'>
          <input className='register-input' type="text" {...register("username", { required: true })} placeholder='Username' />
          <input className='register-input' type="email" {...register("email", { required: true })} placeholder='Email' />
          <input className='register-input' type="password" {...register("password", { required: true })} placeholder='Password' />
          <button className='register-button' type="submit" >Sign up</button>
        </form>
        <p className='swap-to'>Already have an account? <Link href="/login" className='swap-to-link'>Log in</Link></p>
      </div>
    </div>
  )
}

export default Register

