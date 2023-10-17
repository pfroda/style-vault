import './socialgrid.css';

import heartwhite from '../../../../public/heart-white.png';
import heartblack from '../../../../public/heart-black.png';
import searchuser from '../../../../public/search-user.png';
import close from '../../../../public/close.png';
import Header from '../../Header/Header';
import SocialSearch from '../SocialSearch/SocialSearch';
import { useState } from 'react';
import Image from 'next/image';

function SocialGrid() {
  const [isFollowed, setIsFollowed] = useState(false);
  const [serachBar, setSearchBar] = useState(false);

  const handleFollow = () => {
    console.log('clicked');
    setIsFollowed(!isFollowed);
  }

  const myUrl = 'http://res.cloudinary.com/dizg5ajyl/image/upload/v1697185079/file_har9cf.jpg';
  const closet = 'Paris Fashion';
  const username = 'Luigi Faldetta'
  const items = [
    { id: 1, url: myUrl},
    { id: 2, url: myUrl},
    { id: 3, url: myUrl}
  ];

  const handleSearch = () => {
    console.log('seraching...');
    setSearchBar(!serachBar);
  }

  return (
    <div className='SocialGrid'>
      {serachBar && <SocialSearch />}
      <Header />
      <div className="search-container">
        <Image src={serachBar ? close : searchuser} alt="" className={serachBar ? 'close-button' : 'search-user-button'} onClick={handleSearch} />
      </div>
      <div className="social-profile">
        <div className="social-header">
          <div className="social-image"></div>
          <div className="name">@{username}</div>
        </div>
        <div className="status-update">Added items to {closet} Closet</div>
        <div className="grid-container">
          {items.map((item, index) => (
            <div className={`grid-img-container ${index === 1 ? 'grid-img-container-2' : ''}`} key={item.id}>
              <div className={`grid-img ${index === 1 ? 'grid-img-2' : ''}`}></div>
              <img src={item.url} className={`grid-img ${index === 1 ? 'grid-img-2' : ''}`} alt="" />
              <div className={`follow-container ${index === 1 ? 'follow-container-2' : ''}`}>
                <Image src={isFollowed ? heartblack : heartwhite} className='follow' alt="" onClick={handleFollow} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SocialGrid



{/* <div className="grid-container">
  <div className="grid-img-container">
    <div className="grid-img"></div>
    <Image src={url} className='grid-img' alt="" />
    <div className="follow-container">
      <Image src={isFollowed ? heartblack : heartwhite} className='follow' alt="" onClick={handleFollow} />
    </div>
  </div>
  <div className="grid-img-container">
    <div className="grid-img grid-img-2"></div>
    <div className="follow-container follow-container-2">
      <Image src={heartwhite} className='follow' alt="" />
    </div>
  </div>
  <div className="grid-img-container">
    <div className="grid-img"></div>
    <div className="follow-container">
      <Image src={heartwhite} className='follow' alt="" />
    </div>
  </div>
</div> */}