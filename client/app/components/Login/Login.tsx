import '../Register/register.css'
import { useForm } from 'react-hook-form';
import { logUser } from '@/app/Interfaces';
import Link from 'next/link';

function Login() {
  const { register, handleSubmit } = useForm<logUser>();

  // const onSubmit = handleSubmit(async (user: userLoged) => {
  //   await signin(user);
  //   navigate('/initial');
  // });
  const submitForm = () => {
    console.log('hola');
  }

  return (
    <div className="login-page-container" >
      <div className="login-page">
        <form onSubmit={submitForm} className='register-form'>
          <input className='register-input' type="email" {...register("email", { required: true })} placeholder='Email' />
          <input className='register-input' type="password" {...register("password", { required: true })} placeholder='Password' />
          <button className='register-button' type="submit" >Log in</button>
        </form>
          <p className='swap-to'>Don't have an account? <Link href="/register" className='swap-to-link'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login