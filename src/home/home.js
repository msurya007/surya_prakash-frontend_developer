import React from 'react'

import sparkle from '../assets/images/sparkle.jpg'
import SearchForm from './searchForm';

// eslint-disable-next-line
const Home = () => {

    return (
        <div>

            <div className='bg-cover bg-center relative text-white w-full items-center'>
                <img className='w-full h-auto max-h-[360px]' src={sparkle} alt='spaceX' />
                <div className="absolute top-10 left-0 right-0 text-center z-10">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Brainstorm</h1>
                    <p className="text-lg mb-8">Discover amazing features and services</p>
                </div>
            </div>

            {/* Search bar */}
            <div className='m-4'>
                <SearchForm />
            </div>
        </div>
    )
}

export default Home;