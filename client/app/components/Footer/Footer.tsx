'use client'
import './footer.css';
import home from '../../../public/home.png';
import add from '../../../public/plus.png';
import closet from '../../../public/cupboard.png';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import Image from 'next/image';

function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPage) {
      setCurrentPage(pathname);
    }
  }, [router, currentPage]);


  const links = [
    {
      href: '/home',
      imgSrc: pathname === '/home' ? home : home,
      text: 'Home',
    },
    {
      href: '/register',
      imgSrc: add,
      text: 'Upload',
    },
    {
      href: '/login',
      imgSrc: pathname === '/login' ? closet : closet,
      text: 'You',
    },
  ];

  return (
    <div className="Footer">
      {links.map((link, index) => (
        <Link href={link.href} key={index} className="footer-container">
          <Image
            className={`footer-img ${link.href === currentPage ? 'active' : ''}`}
            src={link.imgSrc}
            alt={link.text}
          />
        </Link>
      ))}
    </div>
  )
}

export default Footer