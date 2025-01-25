import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-2 mt-20'>
        
        <img src={assets.logo} alt="" width={150}/>

        <p className='flex-1 border-l border-gray-400 pl-2 text-sm text-gray-500
         max-sm:hidden'>Copyright @AnmolVerma.com | All right reserved</p>

        <div className='flex gap-1'>
            <img src={assets.facebook_icon} alt="" width={35}/>
            <img src={assets.twitter_icon} alt="" width={35}/>
            <img src={assets.instagram_icon} alt="" width={35}/>
        </div>
    </div>
  )
}

export default Footer