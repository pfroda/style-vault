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
import { queryClosets } from '@/app/services/apiGraphQL';
import closetImg from '../../../public/closet.png';
import expandLess from '../../../public/expand-less.png';
import expandMore from '../../../public/expand-more.png';
import iconName from '../../../public/inputname.png';

function OutfitSubmit() {
  const outfitUrl = useSelector((state) => state.outfit.outfitUrl);
  const { register, handleSubmit } = useForm<Outfit>();
  const { user, handleRegister } = useAuth();
  const { handlePostOutfit } = useOutfit();
  const router = useRouter();
  const dispatch = useDispatch();
  const closets = useSelector(state => state.closet.closets);

  const [selectedCloset, setSelectedCloset] = useState<string>('');
  const [showClosetMenu, setShowClosetMenu] = useState(false);

  const toggleClosetMenu = () => {
    setShowClosetMenu(!showClosetMenu);
  };
  
  const handleClosetSelect = (closetId: string) => {
    setSelectedCloset(closetId);
    // toggleClosetMenu();
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

          <div className='input-wrapper' onClick={toggleClosetMenu}>
            <div className='label-container colorDropdownButton'>
              <Image src={closetImg} alt="Icono" />
              <label htmlFor="closets">Closet</label>
            </div>
            <Image className="expand-icon" src={showClosetMenu ? expandLess : expandMore} alt="" />
          </div>

          {closets && (
            <ul className={`colors-dropdown ${showClosetMenu ? 'activedropdown' : ''}`}>
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