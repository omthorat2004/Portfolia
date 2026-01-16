import React from 'react';
import { FaGift, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiLayers } from 'react-icons/fi';

const Footer = () => {
  return (
    <div className='border-2 border-border px-4'>
        <div className='max-w-5xl w-full mx-auto flex justify-between py-6 items-center border-border'>
        <div className='flex text-2xl font-bold text-accent hover:text-accent-hover items-center gap-2'>
            <FiLayers style={{ strokeWidth: 3 }} className="font-extrabold" />
            <h1 className="">Portfolia</h1>
        </div>
        <p className='text-sm'>© {new Date().getFullYear()} CoreDump. All rights reserved.</p>
        <div className='flex gap-2 text-accent'>
            <FaGithub className='cursor-pointer' size={20}/>
            <FaLinkedin className='cursor-pointer' size={20}/>
        </div>
    </div>
    </div>
  );
}

export default Footer;
