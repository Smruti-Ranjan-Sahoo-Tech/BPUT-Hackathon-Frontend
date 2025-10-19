import React from 'react'

const NavBar = () => {
  return (
    <header className='bg-white border-b border-gray-200 h-14 sticky top-0 w-full z-50 shadow-sm'>
        <nav className='flex items-center justify-between h-full px-8'>
            <div className='flex items-center gap-2'>
                <h1 className="text-2xl font-bold text-orange-600">CRM</h1>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Platform</span>
            </div>
            <div className="flex items-center gap-6">
                <span className="text-sm text-gray-600 font-medium">Welcome back</span>
            </div>
        </nav>
    </header>
  )
}

export default NavBar
