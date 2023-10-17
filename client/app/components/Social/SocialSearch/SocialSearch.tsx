import './socialsearch.css';
import searchuser from '../../../../public/search-user.png';
import userImage from '../../../../public/user.png';
import Image from 'next/image';

function SocialSearch() {
  return (
    <div className='SocialSearch'>
      <div className="social-header-container">
        <Image src={searchuser} alt="" className='search-user' />
        <input type="text" placeholder='Search' />
      </div>
      <div className="social-results">
        <div className="user-result">
          <Image alt="" src={userImage} className='profile-image' />
          <div className="profile-username">@Username</div>
        </div>
        <div className="user-result">
          <Image alt="" src={userImage} className='profile-image' />
          <div className="profile-username">@Username</div>
        </div>
      </div>
    </div>
  )
}

export default SocialSearch