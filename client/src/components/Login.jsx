import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react";

const Login = () => {

     const [state,setState] = useState('Sign up');
     const {setShowLogin} = useContext(AppContext);


     useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
     },[]);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex 
    justify-center items-center'>
        
        <motion.form 
        initial={{ opacity:0.2,y:50 }}
        transition={{ duration:0.5 }}
        whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true }}
        className='relative bg-white p-10 rounded-xl text-slate-500'>

            <h1 className='text-center  text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please {state} to continue</p>

                {/* todo */}
            {state !== 'Sign in' && 
                <div className='border px-5 py-2 flex items-center gap-1 rounded-full mt-4'>
                <img src={assets.profile_icon} width={20} alt="" />
                <input className='outline-none text-sm' type="text" placeholder='Full Name' required/>
            </div>}

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt="" />
                <input className='outline-none text-sm' type="email" placeholder='Email id' required/>
            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt="" />
                <input className='outline-none text-sm' type="password" placeholder='Password' required/>
            </div>

            {state === 'Sign in' && 
                <p className='text-sm text-blue-600 my-3 cursor-pointer'>Forgot password?</p>
            }

            <button className={`${state !== 'Sign in' ? 'my-3' : ''} bg-blue-600 cursor-pointer hover:scale-105 w-full text-white py-2 rounded-full`}>{state === 'Sign in' ? 'Sign in' : 'Create Account'}</button>

            {state === 'Sign in' ? 
            
            <p className='mt-3 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign up')}>Sign up</span></p>
                :
            <p className='mt-3 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign in')}>Sign in</span></p>
            
            }
            

            <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>

        </motion.form>

    </div>
  )
}

export default Login