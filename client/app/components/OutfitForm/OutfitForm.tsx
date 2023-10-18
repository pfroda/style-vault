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

import { queryUserItems } from '@/app/services/apiGraphQL';
import { createOutfitImage } from '@/app/services/apiOutfit';
import GoBack from '../GoBack/GoBack';
import OutfitSlider from '../OutfitSlider/OutfitSlider';
import Header from '../Header/Header';
import Image from 'next/image';
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOutfitUrl } from '@/app/GlobalRedux/Features/outfit/outfitSlice';
import { setItemsState } from '../../GlobalRedux/Features/item/itemSlice';
// import { Item } from '@/app/Interfaces';

function OutfitForm() {
  const { user, handleRegister } = useAuth();
  const [currentOutfit, setCurrentOutfit] = useState({id: 'outfit-2'});
  const [showShuffle, setShowShuffle] = useState(false);
  const items = useSelector(state => state.item.items);

  const router = useRouter();
  const dispatch = useDispatch();

  
  useEffect(() => {
    queryUserItems(user?.id!)
      .then(res => {
        console.log('respuesta', res);
        if (res.data?.getUserItems) {
          dispatch(setItemsState(res.data.getUserItems));
        }
        console.log('proba: ', items)
      });
  }, []);
  
  const TwoPiecesOutfit = [
    ['One-Piece', 'Dresses'],
    ['Shoes', 'Boots', 'Sandals', 'Sneakers', 'Heels']];

  const ThreePiecesOutfit = [
    ['Tops', 'Shirts'],
    ['Pants', 'Shorts'],
    ['Shoes', 'Boots', 'Sandals', 'Sneakers', 'Heels']];

  const FourPiecesOutfit = [
    ['Outerwear'],
    ['Tops', 'Shirts'],
    ['Pants', 'Shorts'],
    ['Shoes', 'Boots', 'Sandals', 'Sneakers', 'Heels']];

    
  const shoesArray = items?.filter(item => ThreePiecesOutfit[2].includes(item.category));
  const dressArray = items?.filter(item => TwoPiecesOutfit[0].includes(item.category));
  const outerWearArray = items?.filter(item => FourPiecesOutfit[0].includes(item.category));
  const topsArray = items?.filter(item => ThreePiecesOutfit[0].includes(item.category));
  const pantsArray = items?.filter(item => ThreePiecesOutfit[1].includes(item.category));
  // const myUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';

  // const itemsExample = [
  //   { id: 1, url: myUrl, brand: 'Marca 1' },
  //   { id: 2, url: myUrl, brand: 'Marca 2' },
  //   { id: 3, url: myUrl, brand: 'Marca 2' },
  //   { id: 4, url: myUrl, brand: 'Marca 2' },
  // ];

  // const imagesUrls = [
  //   { url: 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg' },
  //   { url: 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg' }
  // ];

  // const itemsUrls = [myUrl, myUrl, myUrl];

  const handleShuffle = () => {
    setShowShuffle(!showShuffle);
    console.log('dressArray: ', dressArray);
    console.log('outerWearArray: ', outerWearArray);
    console.log('topsArray: ', topsArray);
    console.log('pantsArray: ', pantsArray);
    console.log('shoesArray: ', shoesArray);
  }

  const handleOutfit = () => {
    createOutfitImage(itemsUrls)
      .then(outfitUrl => {
        console.log(outfitUrl);
        dispatch(setOutfitUrl(outfitUrl));
      })
    router.push('/dashboard/outfitsubmit');
  }

  const outfit1 = 'outfit1';
  const outfit2 = 'outfit2';
  const outfit3 = 'outfit3';

  return (
    <div className='OutfitForm'>
      <GoBack />
      <div className="outfit-header">
        <Header />
      </div>
      
      <div className="outfit-slider">
        {currentOutfit.id === 'outfit-1' &&
        <div className='outfit-1'>
          <OutfitSlider items={topsArray} height={200} width={200} category={outfit1} />
          <OutfitSlider items={shoesArray} height={200} width={200} category={outfit1} />
        </div>}

        {currentOutfit.id === 'outfit-2' &&
        <div className='outfit-2'>
          <OutfitSlider items={topsArray} height={150} width={150} category={outfit2} />
          <OutfitSlider items={pantsArray} height={150} width={150} category={outfit2} />
          <OutfitSlider items={shoesArray} height={150} width={150} category={outfit2} />
        </div>}

        {currentOutfit.id === 'outfit-3' &&
        <div className='outfit-3'>
          <OutfitSlider items={outerWearArray} height={125} width={125} category={outfit3} />
          <OutfitSlider items={topsArray} height={125} width={125} category={outfit3} />
          <OutfitSlider items={pantsArray} height={125} width={125} category={outfit3} />
          <OutfitSlider items={shoesArray} height={125} width={125} category={outfit3} />
        </div>}
      </div>
      {/* <div className="outfit-slider">
        {currentOutfit.id === 'outfit-1' &&
        <div className='outfit-1'>
          <OutfitSlider items={itemsExample} height={200} width={200} category={outfit1} />
          <OutfitSlider items={itemsExample} height={200} width={200} category={outfit1} />
        </div>}

        {currentOutfit.id === 'outfit-2' &&
        <div className='outfit-2'>
          <OutfitSlider items={itemsExample} height={150} width={150} category={outfit2} />
          <OutfitSlider items={itemsExample} height={150} width={150} category={outfit2} />
          <OutfitSlider items={itemsExample} height={150} width={150} category={outfit2} />
        </div>}

        {currentOutfit.id === 'outfit-3' &&
        <div className='outfit-3'>
          <OutfitSlider items={itemsExample} height={125} width={125} category={outfit3} />
          <OutfitSlider items={itemsExample} height={125} width={125} category={outfit3} />
          <OutfitSlider items={itemsExample} height={125} width={125} category={outfit3} />
          <OutfitSlider items={itemsExample} height={125} width={125} category={outfit3} />
        </div>}
      </div> */}

      <div className='outfit-form'>
        <button className='outfit-button' type="submit" onClick={handleOutfit} >Create Outfit</button>
      </div>

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