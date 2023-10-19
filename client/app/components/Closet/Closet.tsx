import './closet.css'
import edit from '../../../public/edit-profile1.png';
import defaultUserImage from '../../../public/user.png';
import closet1 from '../../../public/closet1.png';
import closet2 from '../../../public/closet2.png';
import closet3 from '../../../public/closet3.png';
import closet4 from '../../../public/closet4.png';
import close from '../../../public/close.png';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../Header/Header';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '@/app/hooks/useAuth';
import useCloset from '@/app/hooks/useCloset';
import { useRouter } from 'next/navigation'; 
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCloset } from '@/app/GlobalRedux/Features/closet/closetSlice';
import { Closet } from '@/app/Interfaces';
import { RootState } from '@/app/GlobalRedux/store';

function Closet() {
  const { register, handleSubmit, reset } = useForm();
  const { user, handleUserData } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    handleUserData(user?.id!);
  }, []);
  
  const closets = useSelector((state: RootState) => state.closet.closets);
  
  const { loadClosets, handlePostCloset } = useCloset();
  const [closetForm, setClosetForm] = useState(false);

  const showFormCloset = () => {
    setClosetForm(!closetForm);
  }

  const handleProfile = () => {
    router.push('/dashboard/profile');
  }

  useEffect(() => {
    loadClosets(user?.id!);
  }, [user?.id, dispatch]); 

  const submitForm = handleSubmit(async (closet: Partial<Closet>) => {
    closet.userId = user?.id!;
    console.log(closet);
    handlePostCloset(closet as Closet);
    setClosetForm(false);
    reset();
  });

  const handleClosetClick = async (closet: Closet) => {
    console.log('lets closetify');
    console.log('THIS IS CLOSET:', closet)
    dispatch(setSelectedCloset(closet));
    router.push('/dashboard/closets');
    
  }

  return (
    <div className='Closet'>
      <div className="closet-header">
        <Header />
        <div className="profile">
          <div className="profile-content">
          <Image className="img" alt="" src={user?.profilePicture || defaultUserImage} width={100} height={100} />
            <div className="name">{user?.name ? user?.name : user?.username}</div>
          </div>
          <Image className="edit" src={edit} alt="Edit" onClick={handleProfile} />
        </div>
        <div className="header-options">
          <button className='closet-button'>Closets</button>
          {/* <button className='outfit-button'>Outfits</button> */}
          <button className='loves-button'>Loves</button>
        </div>
      </div>

      <div className="user-closets">
        <Link href="/dashboard/grid" className="closets-container">
          <Image alt="" className='closet-image' src={closet2} />
          <div className="closet-name">All Clothes</div>
        </Link>

        {closets.map((closet: Closet) => (
          <div key={closet.id} className="closets-container" onClick={()=>{handleClosetClick(closet)}}>
              <Image alt="" className='closet-image' src={closet2} />
              <div className="closet-name">
                {closet.name}
              </div>
          </div>
        ))}

        <div className="closets-container">
          <Image alt="" className={`closet-image ${closetForm ? 'closet-active' : ''}`} src={closet4} />
          {closetForm ? (
            <>
              <form onSubmit={submitForm} className='closet-form'>
                <Image onClick={showFormCloset} src={close} className="close-closet" alt="" />
                <input className='closet-input' type="text" {...register("name", { required: true })} placeholder='Type the name' />
                <button className='closet-button' type="submit" >Add Closet</button>
              </form>
            </>
          ) : ( 
          <div className="closet-name" onClick={showFormCloset}>Add New Closet</div>)}
        </div>
      </div>
    </div>
  )
}

export default Closet