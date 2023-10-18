import './outfitsubmit.css';
import '../ItemForm/itemform.css';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '@/app/hooks/useAuth';
import { Outfit } from '@/app/Interfaces';
import { useRouter } from 'next/navigation';
import useOutfit from '@/app/hooks/useOutfit';
import GoBack from '../GoBack/GoBack';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { setClosetState } from '@/app/GlobalRedux/Features/closet/closetSlice';
import seasonImg from '../../../public/season.svg';
import { queryClosets } from '@/app/services/apiGraphQL';
import closetImg from '../../../public/closet.png';
import calendarImg  from '../../../public/calendar.png';
import expandLess from '../../../public/expand-less.png';
import expandMore from '../../../public/expand-more.png';
import iconName from '../../../public/inputname.png';
import { occasionsData, seasonsData } from '@/app/utils/mockData';

function OutfitSubmit() {
  const outfitUrl = useSelector((state) => state.outfit.outfitUrl);
  const { register, handleSubmit } = useForm<Outfit>();
  const { user, handleRegister } = useAuth();
  const { handlePostOutfit } = useOutfit();
  const router = useRouter();
  const dispatch = useDispatch();
  const closets = useSelector(state => state.closet.closets);

  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedCloset, setSelectedCloset] = useState<string>('');

  const [showClosetMenu, setShowClosetMenu] = useState(false);
  const [showOccasionMenu, setShowOccasionMenu] = useState(false);
  const [showSeasonMenu, setShowSeasonMenu] = useState(false);

  const toggleClosetMenu = () => {
    setShowClosetMenu(!showClosetMenu);
  };
  const toggleOccasionsMenu = () => {
    setShowOccasionMenu(!showOccasionMenu);
  };
  const toggleSeasonMenu = () => {
    setShowSeasonMenu(!showSeasonMenu);
  };
  
  const handleClosetSelect = (closetId: string) => {
    setSelectedCloset(closetId);
    // toggleClosetMenu();
  };

  const handleSeasonClick = (seasonToRemove: string) => {
    if (selectedSeasons.includes(seasonToRemove)) {
      setSelectedSeasons(prevSeasons => prevSeasons.filter(season => season !== seasonToRemove));
    } else {
      setSelectedSeasons(prevSeasons => [...prevSeasons, seasonToRemove]);
    }
  };

  const handleOccasionClick = (occasionToRemove: string) => {
    if (selectedOccasions.includes(occasionToRemove)) {
      setSelectedOccasions(prevOccasions => prevOccasions.filter(occasion => occasion !== occasionToRemove));
    } else {
      setSelectedOccasions(prevOccasions => [...prevOccasions, occasionToRemove]);
    }
  };

  useEffect(() => {
    console.log(user)
    queryClosets(user?.id!)
      .then(res => {
        console.log(res);
        dispatch(setClosetState(res.data?.getClosets))
      })
  }, []);
   
  const submitForm = handleSubmit(async (outfit: Outfit) => {
    outfit.userId = user?.id!;
    outfit.outfitUrl = outfitUrl;
    outfit.occasion = selectedOccasions;
    outfit.season = selectedSeasons;
    console.log('this is the selected closet:', selectedCloset)
    outfit.closets = selectedCloset;
    handlePostOutfit({
      outfit: outfit, 
      closetId: selectedCloset
    });
    router.push('/dashboard/social');
  });

  return (
    <div className='OutfitSubmit'>
      <GoBack />
      <div className="outfit-form-header">Styling</div>
      <div className="image-outfit-container">
        {outfitUrl ? (<img src={outfitUrl} alt="Atuendo" className='outfit-image' /> ) : ('No Outfit image available')}
      </div>
      
      <div className="outfit-form-container">
        <form onSubmit={submitForm} className='outfit-form'>
          <div className="input-wrapper-name">
            <Image src={iconName} alt="" className="icon-name"/>
            <input className='outfit-name-input' type="text" {...register("name", { required: true })} placeholder='Name' />
          </div>

          {/* SEASON DROPDOWN */}
          <div className='input-wrapper' onClick={toggleSeasonMenu}>
              <div className='label-container colorDropdownButton'>
                <Image src={seasonImg} alt="Icono" />
                <label htmlFor="season">Season</label>
              </div>
              <Image className="expand-icon" src={showSeasonMenu ? expandLess : expandMore} alt="" />
            </div>

          <ul className={`colors-dropdown ${showSeasonMenu ? 'activedropdown' : ''}`}>
            {seasonsData.map((seasonItem) => (
              <li className={`li-wrapper ${selectedSeasons.includes(seasonItem) ? 'active' : ''}`} key={seasonItem} onClick={() => handleSeasonClick(seasonItem)}>
                {seasonItem}
              </li>
            ))}
          </ul>
          {/* SEASONS DROPDOWN */}

          {/* OCASSIONS DROPDOWN */}
          <div className='input-wrapper' onClick={toggleOccasionsMenu}>
            <div className='label-container colorDropdownButton'>
              <Image src={calendarImg} alt="Icono" />
              <label htmlFor="occasion">Occasion</label>
            </div>
            <Image className="expand-icon" src={showOccasionMenu ? expandLess : expandMore} alt="" />
          </div>

          <ul className={`colors-dropdown ${showOccasionMenu ? 'activedropdown' : ''}`}>
            {occasionsData.map((occasionItem) => (
              <li className={`li-wrapper ${selectedOccasions.includes(occasionItem) ? 'active' : ''}`} key={occasionItem} onClick={() => handleOccasionClick(occasionItem)}>
                {occasionItem}
              </li>
            ))}
          </ul>
          {/* OCASSIONS DROPDOWN */}

          <div className='input-wrapper' onClick={toggleClosetMenu}>
            <div className='label-container colorDropdownButton'>
              <Image src={closetImg} alt="Icono" />
              <label htmlFor="closets">Closet</label>
            </div>
            <Image className="expand-icon" src={showClosetMenu ? expandLess : expandMore} alt="" />
          </div>

          {closets && (
            <ul className={`colors-dropdown hey ${showClosetMenu ? 'activedropdown lastactive' : ''}`}>
              {console.log('closetsss ', closets)}
              {closets.map((closetItem: any) => (
                <li className={`li-wrapper ${selectedCloset === closetItem.id ? 'active' : ''}`}
                  key={closetItem.id} onClick={() => handleClosetSelect(closetItem.id)}>
                  {closetItem.name}
                </li>
            ))}
          </ul> )}

            <div className="button-container">
              <button className='outfit-button' type="submit" >Add outfit</button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default OutfitSubmit