'use client'
import '../Register/register.css';
import homeimage from '../../../public/home-image3.png';
import logo from '../../../public/logo3.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import { LoginUser } from '@/app/Interfaces';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import useAuth from '@/app/hooks/useAuth';

function Login() {
  const { register, handleSubmit } = useForm<LoginUser>();
  const { user, handleLogin } = useAuth();

  const router = useRouter();

  const submitForm = handleSubmit(async (user: LoginUser) => {
    handleLogin(user);
    router.push('/dashboard/cupboard');
  });

  return (
    <div className="login-page-container" >
      <Image src={logo} alt="" className='logo-image' />
      <Image src={homeimage} alt="" className='home-image' />
      <div className="login-page">
        <form onSubmit={submitForm} className='register-form'>
          <input className='register-input' type="email" {...register("email", { required: true })} placeholder='Email' />
          <input className='register-input' type="password" {...register("password", { required: true })} placeholder='Password' />
          <button className='register-button' type="submit" >Log in</button>
        </form>
          <p className='swap-to'>Don&apos;t have an account? <Link href="/register" className='swap-to-link'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login