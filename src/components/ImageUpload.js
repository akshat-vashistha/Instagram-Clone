import React, { useState } from 'react'
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import firebase from "firebase/compat/app"
import { db, storage } from '../firebase';
import {collection, addDoc } from "firebase/firestore"
import { ref, getDownloadURL } from 'firebase/storage';

const modal_styles = {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '50px',
    zIndex: 1000
}
const overlay_styles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000
}

function ImageUpload({ posting, closePost, username }) {
    if (!posting) return null
    const [image, setImage] = useState([]);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState([]);
    const postsCollectionRef = collection(db,"posts")

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`/images/${image.name}`).put(image)
        uploadTask.on(
            'state_changed',
            // (snapShot) => {
            //     //takes a snap shot of the process as it is happening
            //     console.log(snapShot)
            // },
            (snapshot)=>{
                console.log(snapshot)
                console.log('fetching Image url...')
                const imageRef= ref(storage, `/images/${image.name}`)
                getDownloadURL(imageRef)
                .then((url)=>{
                    console.log(url)
                    addDoc(postsCollectionRef, {caption: caption, imageURL: url,username: username})
                    
                })
                    .catch((error)=>{
                        switch (error.code) {
                            case 'storage/object-not-found':
                              console.log("File doesn't exist")
                              break;
                            case 'storage/unauthorized':
                              console.log("User doesn't have permission to access the object ") 
                              break;
                            case 'storage/canceled':
                              console.log("User canceled the upload")
                              break;
                      
                            // ...
                      
                            case 'storage/unknown':
                              console.log("Unknown error occurred, inspect the server response ") 
                              break;
                        }
                    })
                
            }
        );
       
    }
    return (
        // having a caption input
        //having a file picker 
        //a post button
        <>
            <div style={overlay_styles} />
            <div className='postInput' style={modal_styles}>

                <progress value={progress} max={100} />
                <Input type="text" placeholder='Enter a caption...' onChange={(event)=>{setCaption(event.target.value)}} />
                <Input type="file" onChange={handleChange} />
                <Button onClick={handleUpload}>Upload</Button>

                <button onClick={closePost}>Close</button>

            </div>
        </>
    )
}

export default ImageUpload
