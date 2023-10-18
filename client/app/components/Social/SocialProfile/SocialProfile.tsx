import '../../Closet/closet.css';

// import './closet.css'
import edit from '../../../../public/edit-profile1.png';
import defaultUserImage from '../../../../public/user.png';
import closet1 from '../../../../public/closet1.png';
import closet4 from '../../../../public/closet4.png';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../Header/Header';
import { queryClosets } from '@/app/services/apiGraphQL';
import { useState, useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';
import useCloset from '@/app/hooks/useCloset';
import useFriend from '@/app/hooks/useFriend';
import { useRouter } from 'next/navigation'; 
import { useDispatch, useSelector } from 'react-redux';
import { setClosetState } from '@/app/GlobalRedux/Features/closet/closetSlice';

function SocialProfile() {
  const { user, handleUserData } = useAuth();
  const {friend, handleFriendData} = useFriend()
  const router = useRouter();

  useEffect(() => {
    handleFriendData(friend?.id!);
    console.log('FRIEND ID:', friend?.id);
    console.log('MY ID:', user?.id)
    console.log('FRIEND DATA:', friend);
    console.log('MY DATA:', user)
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
        const res = await queryClosets(friend?.id!);
        dispatch(setClosetState(res.data?.getClosets || []));
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, [friend?.id, dispatch]); 


  return (
    <div className='Closet'>
      <div className="closet-header">
        <Header />
        <div className="profile">
          <div className="profile-content">
          <Image className="img" alt="" src={friend?.profilePicture || defaultUserImage} width={100} height={100} />
            <div className="name">{friend?.name ? friend?.name : friend?.username}</div>
          </div>
        </div>
        <div className="header-options">
          <button className='closet-button'>Closet</button>
          <button className='outfit-button'>Outfits</button>
        </div>
      </div>

      <div className="user-closets">
        <Link href={`/dashboard/grid?friend=${friend?.username}`} className="closets-container">
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

export default SocialProfile;