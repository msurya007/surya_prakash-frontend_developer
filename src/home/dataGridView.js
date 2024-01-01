import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

//MUI Import
import { Button, Grid, Paper } from '@mui/material';

//Component
import DialogModel from '../common-component/dialogModel';
import UserContext from '../common-component/userContext';

// eslint-disable-next-line
const DataGridView = () => {
    const { searchData, searchTrigger, setSearchTrigger } = useContext(UserContext)
    const [dataList, SetDataList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items to display per page

    useEffect(() => {
        console.log("search", searchData, searchTrigger)
        getList();
    }, [searchTrigger])

    const handleItemClick = (data) => {
        setSelectedItem(data);
        setOpenDialog(true);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataList && dataList.length > 0 ? dataList.slice(indexOfFirstItem, indexOfLastItem) : [];

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getList = async () => {
        setSearchTrigger(false)
        let url = "https://api.spacexdata.com/v4/rockets/query"

        // let obj = {
        //     "query": {
        //         "name": {
        //             "eq": "Starship"
        //         }
        //     }
        // }
        // let body = {
        //     method: "POST",
        //     body: JSON.stringify(obj)
        // }
        try {
            // await fetch(url, body)
            //     .then(res => res.json())
            //     .then(value => {

            //         if (value && value.docs && value.docs.length > 0) {
            //             SetDataList(value.docs)
            //         }
            //         else {
            //             SetDataList([])
            //         }
            //     })
            let query = searchData ? (searchData.name && searchData.type ?
                { name: { $eq: searchData.name }, type: { $eq: searchData.type } }
                : (searchData.name ? { name: { $eq: searchData.name } }
                    : searchData.type ? { name: { $eq: searchData.type } }
                        : {})) : {}
            const { data } = await axios.post(url, {
                query: query
            });
            console.log('API Response:', data);
            if (data && data.docs && data.docs.length > 0) {
                SetDataList(data.docs)
            }
            else {
                SetDataList([])
            }

        }
        catch (e) {
            console.log("Error while fetch list", e)
        }
    }

    const handleItemsPerPageChange = (event) => {
        console.log(event.target.value, "vaa")
        setItemsPerPage(event.target.value);
        setCurrentPage(1);
      };

    return (

        <div>
            <Paper elevation={1} className='p-4 rounded-md drop-shadow-lg'>
                {currentItems && currentItems.length > 0 ?
                    <>
                        <Grid container spacing={2}>
                            {currentItems.map((item) => (
                                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                                    <Paper elevation={3} style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }} onClick={() => handleItemClick(item)}>
                                        <div>
                                            <div>
                                                <img className='w-full h-56' src={item.flickr_images && item.flickr_images.length > 0 ? item.flickr_images[0] : ''} alt={item.name} />
                                            </div>
                                            <div className='h-56 p-4 overflow-hidden hover:overflow-auto'>
                                                <p><span className='font-semibold'>Name: </span>{item.name}</p>
                                                <p><span className='font-semibold'>Company: </span> {item.company}</p>
                                                <p><span className='font-semibold'>Description:</span> {item.description}</p>
                                            </div>
                                        </div>

                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Pagination */}
                        <div className='flex gap-2 items-center justify-end' style={{ marginTop: '20px', textAlign: 'center' }}>
                        <div className='flex items-center'>
                                <p>Item per page:</p>
                                <select
                                name='item'
                                className='border-1'
                                defaultValue={itemsPerPage}
                                onClick={handleItemsPerPageChange}
                                >
                                    
                                    <option value="2">2</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>

                                </select>
                            </div>

                            <Button variant="outlined" disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
                                Previous
                            </Button>

                            <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
                            <Button variant="outlined" disabled={currentItems.length < itemsPerPage} onClick={() => paginate(currentPage + 1)}>
                                Next
                            </Button>

                        </div>
                    </>
                    :
                    <div className='flex justify-center w-full'>
                        <p>No Data Found</p>
                    </div>
                }
            </Paper>


            {/* Popup Dialog */}
            <DialogModel open={openDialog} onclose={setOpenDialog} selectedItem={selectedItem} />
        </div>
    )
}

export default DataGridView;