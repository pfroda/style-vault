'use client'
import './outfitform.css'
import shuffle from '../../../public/shuffle.png';

import Image from 'next/image';
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation'; 
import { useForm } from 'react-hook-form';
import { Outfit } from '@/app/Interfaces';
import { useState } from 'react';

function OutfitForm() {
  const { register, handleSubmit } = useForm<Outfit>();
  const { user, handleRegister } = useAuth();
  const [currentOutfit, setCurrentOutfit] = useState({id: 'outfit-1'});

  const router = useRouter();

  const submitForm = handleSubmit(async (outfit: Outfit) => {
    handleRegister(outfit);
    router.push('/dashboard/cupboard');
  });

  const myUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';
  const items = [
    { id: 1, url: myUrl, brand: 'Marca 1' },
    { id: 2, url: myUrl, brand: 'Marca 2' },
    { id: 3, url: myUrl, brand: 'Marca 2' },
    { id: 4, url: myUrl, brand: 'Marca 2' },
  ];

  return (
    <div className='OutfitForm'>
      <div className="outfit-header"></div>
      
      <div className="outfit-slider">
        {currentOutfit.id === 'outfit-1' &&
        <div className='outfit-1'>
          <div className="img top"></div>
          <div className="img bottom"></div>
        </div>}
        {currentOutfit.id === 'outfit-2' &&
        <div className='outfit-2'>
          <div className="img top"></div>
          <div className="img middle"></div>
          <div className="img bottom"></div>
        </div>}
        {currentOutfit.id === 'outfit-3' &&
        <div className='outfit-3'>
          <div className="img hat"></div>
          <div className="img top"></div>
          <div className="img middle"></div>
          <div className="img bottom"></div>
        </div>}
      </div>

      <form onSubmit={submitForm} className='register-form'>
        <button className='register-button' type="submit" >Add Outfit</button>
      </form>

      <footer>
        <div className="footer-container">
          <button className={`outfit-footer-item ${currentOutfit.id === 'outfit-1' ? 'selected' : ''}`} onClick={() => setCurrentOutfit({ id: 'outfit-1' })}>Ic 1</button>
          <button className={`outfit-footer-item ${currentOutfit.id === 'outfit-2' ? 'selected' : ''}`} onClick={() => setCurrentOutfit({ id: 'outfit-2' })}>Ic 2</button>
          <button className={`outfit-footer-item ${currentOutfit.id === 'outfit-3' ? 'selected' : ''}`} onClick={() => setCurrentOutfit({ id: 'outfit-3' })}>Ic 3</button>
          <div className="shuffle-container">
            <Image className="outfit-footer-item shuffle" src={shuffle} alt="" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default OutfitForm


  // const itemCount = 7;

  // const items = Array.from({ length: itemCount }, (_, index) => ({
  //   id: index + 1,
  //   url: myUrl,
  //   brand: `Marca ${index + 1}`,
  // }));
