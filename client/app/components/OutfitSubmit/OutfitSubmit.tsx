import './outfitsubmit.css';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '@/app/hooks/useAuth';
import { Outfit } from '@/app/Interfaces';
import { useRouter } from 'next/navigation';
import useOutfit from '@/app/hooks/useOutfit';
import GoBack from '../GoBack/GoBack';

function OutfitSubmit() {
  const outfitUrl = useSelector((state) => state.outfit.outfitUrl);
  const { register, handleSubmit } = useForm<Outfit>();
  const { user, handleRegister } = useAuth();
  const { handlePostOutfit } = useOutfit();

  const router = useRouter();

  const submitForm = handleSubmit(async (outfit: Outfit) => {
    outfit.userId = user?.id!;
    outfit.outfitUrl = outfitUrl;
    handlePostOutfit(outfit);
    router.push('/dashboard/cupboard');
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
            <input className='outfit-name-input' type="text" {...register("name", { required: true })} placeholder='Name' />
            <button className='outfit-button' type="submit" >Add outfit</button>
          </form>
      </div>
    </div>
  )
}

export default OutfitSubmit