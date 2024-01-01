import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'

const DialogModel = (props) => {
    const { open, onclose, selectedItem } = props
    return (
        <>
            <Dialog fullWidth maxWidth="md" open={open} onClose={onclose}>
                <DialogTitle bgcolor={'black'} color={'white'}>{selectedItem && `Details for ${selectedItem.name}`}</DialogTitle>
                <DialogContent dividers>
                    {selectedItem && (
                        <div>
                            <p><span className='font-semibold'>Name: </span>{selectedItem.name}</p>
                            <p><span className='font-semibold'>Company: </span> {selectedItem.company}</p>
                            <p><span className='font-semibold'>Description:</span> {selectedItem.description}</p>

                            <p className='font-semibold'>Images:</p>
                            <div className='flex'>
                                <img className='w-full h-56' src={selectedItem.flickr_images && selectedItem.flickr_images.length > 0 ? selectedItem.flickr_images[0] : ''} alt={selectedItem.name} />
                                <img className='w-full h-56' src={selectedItem.flickr_images && selectedItem.flickr_images.length > 0 ? selectedItem.flickr_images[1] : ''} alt={selectedItem.name} />
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onclose(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogModel;