'use client'
import './footer.css';
import home from '../../../public/home.png';
import add from '../../../public/plus.png';
import closet from '../../../public/cupboard.png';
import AddPopup from '../AddPopup/AddPopup';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import Image from 'next/image';

function  Footer () {
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(pathname);
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    if (pathname !== currentPage) {
      setCurrentPage(pathname);
    }
  }, [router, currentPage]);

  const togglePopup = (event) => {
    event.preventDefault();
    setPopupVisible(!isPopupVisible);
  };

  const links = [
    {
      href: '/dashboard/social',
      imgSrc: pathname === '/home' ? home : home,
      text: 'Home',
    },
    {
      href: '#',
      onClick: togglePopup,
      imgSrc: add,
      text: 'Upload',
    },
    {
      href: '/dashboard/cupboard',
      imgSrc: pathname === '/login' ? closet : closet,
      text: 'You',
    },
  ];

  return (
    <div className='footer-wrapper'>
      <div className="Footer">
      <div className={`popup-container ${isPopupVisible ? 'popup-active' : ''}`}>
        <AddPopup isPopupVisible={isPopupVisible} />
      </div>
      <div className="footer-links">
        {links.map((link, index) => (
          <Link href={link.href} key={index} className="footer-container">
            <Image
              className={`footer-img ${link.href === currentPage ? 'active' : ''}`}
              src={link.imgSrc}
              alt={link.text}
              onClick={link.onClick}
            />
          </Link>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Footer