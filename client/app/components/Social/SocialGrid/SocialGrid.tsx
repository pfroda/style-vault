import './socialgrid.css';

import heartwhite from '../../../../public/heart-white.png';
import heartblack from '../../../../public/heart-black.png';
import searchuser from '../../../../public/search-user.png';
import close from '../../../../public/close.png';
import userImage from '../../../../public/user.png';
import Header from '../../Header/Header';
import SocialSearch from '../SocialSearch/SocialSearch';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { queryFeed } from '@/app/services/apiGraphQL';

function SocialGrid() {
  const [isFollowed, setIsFollowed] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [feedData, setFeedData] = useState([]);

  const handleFollow = () => {
    console.log('clicked');
    setIsFollowed(!isFollowed);
  }

  useEffect(() => {
    queryFeed().then(response => {
      console.log(response);
      if (response && response.data && response.data.getFeed) {
        setFeedData(response.data.getFeed);
      }
    })
  }, []);

  const myUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';
  const closet = 'Paris Fashion';
  const username = 'Luigi Faldetta'
  const items = [
    { id: 1, url: myUrl},
    { id: 2, url: myUrl},
    { id: 3, url: myUrl}
  ];

  const handleSearch = () => {
    setSearchBar(!searchBar);
  }

  const handlecaca = () => {
    console.log(feedData);
  }

  return (
    <div className='SocialGrid'>
      {searchBar && <SocialSearch />}
      <Header />
      <div className="search-container">
        <Image src={searchBar ? close : searchuser} alt="" className={searchBar ? 'close-button' : 'search-user-button'} onClick={handleSearch} />
      </div>

      {/* <div className="social-profile-wrapper"> */}
      <div className={`social-profile-wrapper ${searchBar ? 'active' : ''}`}>
        {feedData && feedData.map(item => (
          <div key={item.item.id} className="social-profile-container">
            <div className="user-info">
              <Image src={item.user.profilePicture || userImage} alt="" width={40} height={40} className='user-profile-picture' />
              <h4>@{item.user.username}</h4>
            </div>
            <h3>{item.message}</h3>
            <div className="social-profile">
              <Image src={item.item.itemUrl} width={250} height={250} alt="" className='feed-image' />
            </div>
            <div className="follow-container">
              <Image src={isFollowed ? heartblack : heartwhite} className='follow' alt="" onClick={handleFollow} />
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default SocialGrid
