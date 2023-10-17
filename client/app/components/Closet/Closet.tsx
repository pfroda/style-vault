import './closet.css'
import arrow from '../../../public/right-arrow.png';
import edit from '../../../public/edit-profile1.png';
import defaultUserImage from '../../../public/user.png';
import Image from 'next/image';
import { Closet as ClosetInterface } from '@/app/Interfaces';
import Link from 'next/link';
import { queryClosets } from '@/app/services/apiGraphQL';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '@/app/hooks/useAuth';
import useCloset from '@/app/hooks/useCloset';
import { useRouter } from 'next/navigation'; 
import { useDispatch, useSelector } from 'react-redux';
import { setClosetState } from '@/app/GlobalRedux/Features/closet/closetSlice';

function Closet() {
  // const [closets, setClosets] = useState<ClosetInterface[]>([]);
  const { register, handleSubmit, reset } = useForm();
  const { user, handleUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    handleUserData(user?.id!);
  }, []);

  const dispatch = useDispatch();
  const closets = useSelector(state => state.closet.closets);
  
  const { handlePostCloset } = useCloset();
  const [closetForm, setClosetForm] = useState(false);

  const showFormCloset = () => {
    setClosetForm(!closetForm);
  }

  const handleProfile = () => {
    router.push('/dashboard/profile');
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await queryClosets(user?.id!);
        console.log('lo que queremos:', res.data?.getClosets);
        dispatch(setClosetState(res.data?.getClosets || []));
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [user?.id, dispatch]); 
  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const  res = await queryClosets(user?.id!);
  //       console.log('lo que queremos:', res.data?.getClosets)
  //       setClosets(res.data?.getClosets || []);
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   };
  //   fetchItems();
  // }, [user?.id]);  

  const submitForm = handleSubmit(async (closet) => {
    closet.userId = user?.id!;
    console.log(closet);
    handlePostCloset(closet);
    setClosetForm(false);
    reset();
  });

  return (
    <div className='Closet'>
      <div className="closet-header">
        <div className="style-vault">Style-vault</div>
        <div className="profile">
          <div className="profile-content">
          <Image className="img" alt="" src={user?.profilePicture || defaultUserImage} width={100} height={100} />
            <div className="name">Natalie</div>
          </div>
          <Image className="edit" src={edit} alt="Edit" onClick={handleProfile} />
        </div>
        <div className="header-options">
          <button className='closet-button'>Closet</button>
          <button className='outfit-button'>Outfits</button>
          <button className='loves-button'>Loves</button>
        </div>
      </div>

      <div className="user-closets">
        <div className="closets-container">
          <Link className="closet-name" href="/dashboard/grid">All Clothes</Link>
        </div>

        {closets.map((closet) => (
          <div key={closet.id} className="closets-container">
              <div className="closet-name">
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