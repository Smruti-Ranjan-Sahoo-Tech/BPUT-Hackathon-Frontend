import React from 'react'
import NavBar from '../layout/NavBar'
import Sidebar from '../layout/Sidebar'
import RouterHandler from '../routers/RouterHandler'
import ChatBot from '@/layout/ChatBot'

const Home = () => {
    return (
            <div className='grid min-h-screen grid-cols-[auto,1fr] bg-white'>
                {/* Top Navigation */}
                <NavBar className="grid-cols-1" />

                {/* Sidebar and Main content */}
                <div className="flex">
                    <div>
                        <Sidebar className="" />
                    </div>
                    <main className="flex-1">
                        <div className='bg-gradient-to-b from-blue-50 to-white min-h-screen'>
                            <RouterHandler />
                        </div>
                    </main>
                </div>
                <div>
                    <ChatBot className="" />
                </div>
            </div>
    )
}

export default Home
