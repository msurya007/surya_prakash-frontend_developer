import React, { useState } from 'react'

//Component
import DataGridView from './dataGridView';
import UserContext from '../common-component/userContext';


const SearchForm = () => {

    const [searchData, setSearchData] = useState({});
    const [searchTrigger, setSearchTrigger] = useState(false);

    const handleChange = (field, value) => {
        setSearchData({ ...searchData, [field]: value });
    };

    const handleSearchClick = () => {
        setSearchTrigger(true)
    };

    return (
        <div>
            {/* Search bar */}
            <div className="w-1/2 mx-auto p-4 bg-white rounded-full drop-shadow-lg">
                <div className='flex items-center justify-between mx-5'>
                    <div className='mb-2'>
                        <label className="block text-sm font-medium text-gray-600">
                            Name:
                            <input type="text"
                                className="mt-1 p-2 w-full border rounded-md"
                                value={searchData.name}
                                onChange={(e) => handleChange('name', e.target.value)} />
                        </label>
                    </div>

                    <div className='mb-2'>
                        <label>
                            Type:
                            <input type="text"
                                value={searchData.type}
                                className="mt-1 p-2 w-full border rounded-md"
                                onChange={(e) => handleChange('type', e.target.value)} />
                        </label>
                    </div>

                    <div>
                        <button
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                            onClick={handleSearchClick}>Search</button>
                    </div>
                </div>
            </div>

            {/* Data List */}

            <UserContext.Provider value={{ searchData, searchTrigger, setSearchTrigger }}>
                <div className='mt-4'>
                    <DataGridView />
                </div>
            </UserContext.Provider>

        </div>
    )
}

export default SearchForm;