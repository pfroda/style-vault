'use client';
import './outfitform.css';
import shuffle from '../../../public/shuffle.png';
import shufflewhite from '../../../public/shuffle-white.png';
import out2white from '../../../public/outfit-two-white.png';
import out2black from '../../../public/outfit-two-black.png';
import out3white from '../../../public/outfit-three-white.png';
import out3black from '../../../public/outfit-three-black.png';
import out4white from '../../../public/outfit-four-white.png';
import out4black from '../../../public/outfit-four-black.png';
import logo from '../../../public/logo1.png';
import back from '../../../public/close.png';

import OutfitSlider from '../OutfitSlider/OutfitSlider';

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
  const [showShuffle, setShowShuffle] = useState(false);

  const router = useRouter();

  const submitForm = handleSubmit(async (outfit: Outfit) => {
    handleRegister(outfit);
    // router.push('/dashboard/cupboard');
  });

  // const myUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697288267/file_idv86n.png';
  const myUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';
  const items = [
    { id: 1, url: myUrl, brand: 'Marca 1' },
    { id: 2, url: myUrl, brand: 'Marca 2' },
    { id: 3, url: myUrl, brand: 'Marca 2' },
    { id: 4, url: myUrl, brand: 'Marca 2' },
  ];

  const outfit1 = 'outfit1';
  const outfit2 = 'outfit2';
  const outfit3 = 'outfit3';

  const handleBack = () => {
    router.back();
  }

  const handleShuffle = () => {
    console.log('shuffle clicked');
    setShowShuffle(!showShuffle);
  }

  return (
    <div className='OutfitForm'>
      <div className="outfit-header">
        <Image className='back' alt="" src={back} onClick={handleBack} />
        <Image className='logo' alt="" src={logo} />
      </div>
      
      <div className="outfit-slider">
        {currentOutfit.id === 'outfit-1' &&
        <div className='outfit-1'>
          <OutfitSlider items={items} height={200} width={200} category={outfit1} />
          <OutfitSlider items={items} height={200} width={200} category={outfit1} />
        </div>}

        {currentOutfit.id === 'outfit-2' &&
        <div className='outfit-2'>
          <OutfitSlider items={items} height={150} width={150} category={outfit2} />
          <OutfitSlider items={items} height={150} width={150} category={outfit2} />
          <OutfitSlider items={items} height={150} width={150} category={outfit2} />
        </div>}

        {currentOutfit.id === 'outfit-3' &&
        <div className='outfit-3'>
          <OutfitSlider items={items} height={125} width={125} category={outfit3} />
          <OutfitSlider items={items} height={125} width={125} category={outfit3} />
          <OutfitSlider items={items} height={125} width={125} category={outfit3} />
          <OutfitSlider items={items} height={125} width={125} category={outfit3} />
        </div>}
      </div>

      <form onSubmit={submitForm} className='outfit-form'>
        <button className='outfit-button' type="submit" >Add Outfit</button>
      </form>

      <footer>
        <div className="footer-container">
          <div className="triangulo triangulo1"></div>
          <div className="triangulo triangulo2"></div>
          <div className="outfit-icon-container">
            <Image className={`outfit-footer-item ${currentOutfit.id === 'outfit-1' ? 'selected' : ''}`} onClick={() => setCurrentOutfit({ id: 'outfit-1' })} alt="" src={currentOutfit.id === 'outfit-1' ? out2white : out2black} />
          </div>
          <div className="outfit-icon-container">
            <Image className={`outfit-footer-item ${currentOutfit.id === 'outfit-2' ? 'selected' : 'out3white'}`} onClick={() => setCurrentOutfit({ id: 'outfit-2' })} alt="" src={currentOutfit.id === 'outfit-2' ? out3white : out3black} />
          </div>
          <div className="outfit-icon-container">
            <Image className={`outfit-footer-item ${currentOutfit.id === 'outfit-3' ? 'selected' : ''}`} onClick={() => setCurrentOutfit({ id: 'outfit-3' })} alt="" src={currentOutfit.id === 'outfit-3' ? out4white : out4black} />
          </div>
          <div className={`shuffle-container ${showShuffle ? 'white-shuffle-container' : ''}`}>
            <Image className="outfit-footer-item shuffle" src={showShuffle ? shuffle : shufflewhite} onClick={handleShuffle} alt="" />
            {/* <Image className="outfit-footer-item shuffle" src={shuffle} alt="" /> */}
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
