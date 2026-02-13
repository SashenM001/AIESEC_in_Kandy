import Image from 'next/image';
import Link from 'next/link'
// import AiesecLogo from './Icons/bluelogo.png';
import AiesecLogo from '../public/assets/images/bluelogo.png'
import KandyLogo from '../public/assets/images/kandy-logo.png'

import '@styles/globals.css';
import { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

function Nav() {

  const [showMenu, setShowMenu] = useState(false);
  const toggle = () => {
    setShowMenu(!showMenu);
  };

  const toggleClose = () => {
    setShowMenu(false);
  };

  return (
    <nav id='mobile-nav' className='pt-1 flex justify-between items-center h-20 bg-white fixed z-50 w-full shadow-lg px-4'>
      <div id='mobile-nav-logo' className='flex items-center gap-3'>

        <Link href="/#home">
          <Image src={AiesecLogo} alt="AIESEC Logo" width={150} className='hidden xsm:block' />
        </Link>

        {/* hidden lg:block */}
        <button className={showMenu ? 'toggle-btn-hide' : 'toggle-btn-show'} onClick={toggle}><HiMenuAlt3 size={'1.5rem'} color='#037Ef3' /></button>
        <button className={showMenu ? 'toggle-btn-show' : 'toggle-btn-hide'} onClick={toggleClose}><AiOutlineClose size={'1.5rem'} color='#037Ef3' /></button>
      </div>
      <div className='lg:static absolute bg-white lg:min-h-fit min-h-[60vh] left-0 top-[9%] lg:w-auto w-full flex-1' id={showMenu ? 'show' : 'hide'}>
        <ul className="flex lg:flex-row flex-col lg:justify-center xsm:items-center md:gap-[4vw] gap-10 pt-6">
          <li onClick={toggle}>
            <Link href="/#home">Home</Link>
          </li>
          <li onClick={toggle}>
            <Link href="/#about">Who Are We</Link>
          </li>
          <li onClick={toggle}>
            <Link href="/#news-events">News & Events</Link>
          </li>
          <li onClick={toggle}>
            <Link href="/#partners">Partners</Link>
          </li>
          <li onClick={toggle}>
            <Link href="/#footer">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className='flex items-center'>
        <Image src={KandyLogo} alt="Kandy Logo" width={120} className='hidden xsm:block' />
      </div>
    </nav>
  );
}

export default Nav;
