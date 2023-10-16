import './socialgrid.css';

import heartwhite from '../../../../public/heart-white.png';
import heartblack from '../../../../public/heart-black.png';
import { useState } from 'react';
import Image from 'next/image';

function SocialGrid() {
  const [follow, setFollow] = useState('')

  const handleFollow = () => {
    console.log('clicked')
  }

  return (
    <div className='SocialGrid'>
      <div className="social-profile">
        <div className="social-header">
          <div className="social-image"></div>
          <div className="name">@Luigi Faldetta</div>
        </div>
        <div className="grid-container">
          <div className="grid-img-container">
            <div className="grid-img"></div>
            <div className="follow-container">
              <Image src={heartwhite} className='follow' alt="" onClick={handleFollow} />
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
        </div>
      </div>
    </div>
  )
}

export default SocialGrid