import '../../Closet/coset.css';

import './closet.css'
import edit from '../../../public/edit-profile1.png';
import defaultUserImage from '../../../public/user.png';
import closet1 from '../../../public/closet1.png';
import closet4 from '../../../public/closet4.png';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../Header/Header';
import { queryClosets } from '@/app/services/apiGraphQL';
import { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';
import useCloset from '@/app/hooks/useCloset';
import { useRouter } from 'next/navigation'; 
import { useDispatch, useSelector } from 'react-redux';
import { setClosetState } from '@/app/GlobalRedux/Features/closet/closetSlice';

function Closet() {
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


  return (
    <div className='Closet'>
      <div className="closet-header">
        <Header />
        <div className="profile">
          <div className="profile-content">
          <Image className="img" alt="" src={user?.profilePicture || defaultUserImage} width={100} height={100} />
            <div className="name">{user?.name ? user?.name : user?.username}</div>
          </div>
        </div>
        <div className="header-options">
          <button className='closet-button'>Closet</button>
          <button className='outfit-button'>Outfits</button>
        </div>
      </div>

      <div className="user-closets">
        <Link href="/dashboard/grid" className="closets-container">
          <Image alt="" className='closet-image' src={closet1} />
          <div className="closet-name">All Clothes</div>
        </Link>

        {closets.map((closet) => (
          <div key={closet.id} className="closets-container">
              <Image alt="" className='closet-image' src={closet1} />
              <div className="closet-name">
                {closet.name}
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Closet