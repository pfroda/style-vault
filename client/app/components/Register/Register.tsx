'use client'
import './register.css';
import { useEffect } from 'react';
import { registerUser } from '@/app/Interfaces';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation'; 
import Link from 'next/link';

import { increment, decrement, incrementByAmount } from '@/app/GlobalRedux/Features/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';

function RegisterPage() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<registerUser>();
  // const router = useRouter();

  // useEffect(() => {
  //   if (isAuthenticated) navigate('/initial');
  // }, [isAuthenticated]);

  // const submitForm = handleSubmit(async (user: User) => {
  //   await signup(user);
  //   router.push('/');
  // });
  const submitForm = () => {
    console.log('hola');
  }

  return (
    <div className="register-page-container">
      <div className="contador">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <span style={{color: 'white'}}>{count}</span>
      </div>
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

export default RegisterPage

