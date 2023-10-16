import './header.css';

import Image from 'next/image';
import logo from '../../../public/logo1.png';

function Header() {
  return (
    <div className='Header'>
      <Image className='logo' alt="" src={logo} />
    </div>
  )
}

export default Header