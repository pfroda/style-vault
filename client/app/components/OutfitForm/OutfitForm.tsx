'use client'
import './outfitform.css'
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation'; 
import { useForm } from 'react-hook-form';
import { Outfit } from '@/app/Interfaces';

function OutfitForm() {
  const { register, handleSubmit } = useForm<Outfit>();
  const { user, handleRegister } = useAuth();

  const router = useRouter();

  const submitForm = handleSubmit(async (outfit: Outfit) => {
    handleRegister(outfit);
    router.push('/dashboard/cupboard');
  });

  return (
    <div className='OutfitForm'>
      <form onSubmit={submitForm} className='register-form'>
          {/* <input className='register-input' type="text" {...register("username", { required: true })} placeholder='Username' />
          <input className='register-input' type="email" {...register("email", { required: true })} placeholder='Email' />
          <input className='register-input' type="password" {...register("password", { required: true })} placeholder='Password' /> */}
          <button className='register-button' type="submit" >Add Outfit</button>
        </form>

        <footer>
          <div className="footer-container">
            <button className="outfit-footer-item">1</button>
            <button className="outfit-footer-item">2</button>
            <button className="outfit-footer-item">3</button>
            <button className="outfit-footer-item">4</button>
          </div>
        </footer>
    </div>
  )
}

export default OutfitForm