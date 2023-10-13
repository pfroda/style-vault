import './closet.css'
import arrow from '../../../public/right-arrow.png';
import Image from 'next/image';
import { Closet as ClosetInterface } from '@/app/Interfaces';
import { queryClosets } from '@/app/services/apiGraphQL';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '@/app/hooks/useAuth';
import useCloset from '@/app/hooks/useCloset';

function Closet() {
  const [closets, setClosets] = useState<ClosetInterface[]>([]);
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  
  const { handlePostCloset } = useCloset();
  const [closetForm, setClosetForm] = useState(false);

  const showFormCloset = () => {
    setClosetForm(!closetForm);
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const  res = await queryClosets(user?.id!);
        console.log(res)
        console.log('lo que queremos:', res.data?.getClosets)
        setClosets(res.data?.getClosets || []);
      } catch (error) {
        console.log(error)
      }
    };
    
    fetchItems();
  }, [user?.id]); 

  const submitForm = handleSubmit(async (closet) => {
    closet.userId = user?.id!;
    console.log(closet);
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
        
        {closets.map((closet) => (
          <div className="closets-container">
              <div key={closet.id} className="closet-name">
                {closet.name}
              </div>
          </div>
        ))}

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