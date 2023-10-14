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

import OutfitSlider from '../OutfitSlider/OutfitSlider';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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

  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    // dots: true,
  };

  const handleShuffle = () => {
    console.log('shuffle clicked');
    setShowShuffle(!showShuffle);
  }

  return (
    <div className='OutfitForm'>
      <div className="outfit-header"></div>
      
      <div className="outfit-slider">
        {currentOutfit.id === 'outfit-1' &&
          <div className='outfit-1'>
            <OutfitSlider items={items} height={200} width={200} />
            <OutfitSlider items={items} height={200} width={200} />
              {/* <Slider {...sliderSettings} className="something">
                {items
                //  .filter(image => image.length > 0)
                  .map((item, index) => (
                    <div key={index} className='img top'>
                      <Image className="outfit-slider-img" width={200} height={200} src={item.url} alt="" />
                    </div>
                  ))}
              </Slider>
              <Slider {...sliderSettings} className="something">
                {items
                //  .filter(image => image.length > 0)
                  .map((item, index) => (
                    <div key={index} className='img bottom'>
                      <Image className="outfit-slider-img" width={200} height={200} src={item.url} alt="" />
                    </div>
                  ))}
              </Slider> */}
          </div>}
        {/* {currentOutfit.id === 'outfit-1' &&
        <div className='outfit-1'>
          <div className="img top"></div>
          <div className="img bottom"></div>
        </div>} */}
        {currentOutfit.id === 'outfit-2' &&
        <div className='outfit-2'>
          <OutfitSlider items={items} height={150} width={150} />
          <OutfitSlider items={items} height={150} width={150} />
          <OutfitSlider items={items} height={150} width={150} />
          {/* <div className="img top"></div>
          <div className="img middle"></div>
          <div className="img bottom"></div> */}
        </div>}
        {currentOutfit.id === 'outfit-3' &&
        <div className='outfit-3'>
          <OutfitSlider items={items} height={125} width={125} />
          <OutfitSlider items={items} height={125} width={125} />
          <OutfitSlider items={items} height={125} width={125} />
          <OutfitSlider items={items} height={125} width={125} />
          {/* <div className="img hat"></div>
          <div className="img top"></div>
          <div className="img middle"></div>
          <div className="img bottom"></div> */}
        </div>}
      </div>

      <form onSubmit={submitForm} className='register-form'>
        <button className='register-button' type="submit" >Add Outfit</button>
      </form>

      <footer>
        <div className="footer-container">
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
