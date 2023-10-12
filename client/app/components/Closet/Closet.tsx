import './closet.css'
import arrow from '../../../public/right-arrow.png';
import Image from 'next/image';
import { Closet as ClosetInterface } from '@/app/Interfaces';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '@/app/hooks/useAuth';
import useCloset from '@/app/hooks/useCloset';

function Closet() {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const { handlePostCloset } = useCloset();

  const [closetForm, setClosetForm] = useState(false);

  const showFormCloset = () => {
    setClosetForm(!closetForm);
  }

  const submitForm = handleSubmit(async (closet) => {
    console.log(closet);
    closet.userId = user?.id!;
    handlePostCloset(closet);
  });

  return (
    <div className='Closet'>
      <div className="closet-header">
        <div className="style-vault">Style-vault</div>
        <div className="profile">
          <div className="profile-content">
            <div className="img"></div>
            <div className="name">Natalie</div>
          </div>
          <Image className="arrow" src={arrow} alt="Right Arrow" />
        </div>
        <div className="header-options">
          <button className='closet-button'>Closet</button>
          <button className='outfit-button'>Outfits</button>
          <button className='loves-button'>Loves</button>
        </div>
      </div>

      <div className="user-closets">
        <div className="closets-container">
            <div className="closet-name">All Clothes</div>
        </div>
        <div className="closets-container">
            <div className="closet-name">Barcelona closet</div>
        </div>
        {/* <div className="closets-container">
            <div className="closet-name">Honduras closet</div>
        </div>
        <div className="closets-container">
            <div className="closet-name">Add new closet</div>
        </div> */}
        <div className="closets-container">
          {closetForm ? (
            <>
              <form onSubmit={submitForm} className='register-form'>
                <div onClick={showFormCloset} className="close-closet">X</div>
                <input className='closet-input' type="text" {...register("name", { required: true })} placeholder='Closet name' />
                <button className='closet-button' type="submit" >Add Closet</button>
              </form>
            </>
          ) : ( 
          <div onClick={showFormCloset} className="closet-name">Add new closet</div>)}
        </div>
      </div>
    </div>
  )
}

export default Closet