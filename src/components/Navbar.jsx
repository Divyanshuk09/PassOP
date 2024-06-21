import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 justify-between text-white flex items-center md:px-60 px-8 h-14'>
      <div className='Logo font-bold text-2xl'>
        <span className='text-green-400'>&lt;</span>
        <span>Pass</span>
        <span className='text-green-400'>OP</span>
        <span className='text-white'>/</span>
        <span className='text-green-400'>&gt;</span>
      </div>
      
          <button className=' flex items-center bg-[#3f3f3f92] rounded-full hover:bg-[#65246392] hover:border border-purple-100'>
            <img src="/icons/github.svg" alt="" />
            <span className='text-bold pr-2'>Github</span></button>
    </nav>
  )
}

export default Navbar
