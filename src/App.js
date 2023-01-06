import './App.css';
import Post from './components/Post'
import ImageUpload from './components/ImageUpload';
import React, { useEffect, useState } from 'react'
import { db, auth } from "./firebase"
import Modal from './components/Modal';
import { Input } from '@mui/material';
import { Button } from '@mui/material';

function App() {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState([]);
  const [openSignIn, setOpenSignIn] = useState(false)
  const [letsPost, setLetsPost] = useState(false);
let userDisplayName =  user===null? " ": user.displayName

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has looged in
        console.log(authUser);
        setUser(authUser)

        if (authUser.displayName) {
          //dont update username
        } else {
          //user has logged out 
          return authUser.updateProfile({
            displayName: username
          })
        }
      }
      else {
        //user has logged out
        setUser(null)
      }

      return () => {
        //perform some cleanup actions
        unsubscribe()
      }
    })
  }, [user, username])


  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))  //we have an array of the data present in the doc 
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
    setIsOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false)
  }


  return (
    <div className="App">


      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <center>Sign up</center>
        <form className='app_signup' >
          <Input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type='submit' onClick={signUp}>Sign up</Button>

        </form>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <center>Sign in</center>
        <form className='app_signin'>
          <Input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type='submit' onClick={signIn}>Sign in</Button>
        </form>
      </Modal>

      <ImageUpload username={userDisplayName} posting={letsPost} closePost={()=>setLetsPost(false)} />

      <div className="app_header">
        <img className='app_headerImage' src="https://assets.turbologo.com/blog/en/2019/09/19084953/instagram-logo-illustration-958x575.png" alt='' />


        {user ? (
          <div>
            <Button onClick={() => setLetsPost(true)}>Post</Button>
            <Button onClick={() => auth.signOut()}>Log out</Button>

          </div>
        ) : (
          <div className="app_login_container">
            <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
            <Button onClick={() => setIsOpen(true)}>Sign up</Button>

          </div>
        )}
      </div>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageURL={post.imageURL} />
        ))
      }

    </div>
  )
}

export default App


