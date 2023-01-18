import React, { useState } from 'react'
import Add from '../img/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
      
    try {
            const res = await createUserWithEmailAndPassword(auth, email, password);


            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:

uploadTask.on( 
  
   
  (error) => {
    // Handle unsuccessful uploads
        setErr(true);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      //console.log('File available at', downloadURL);
      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });
         //create user on firestore
         await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
         });
        
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/");
    });
      
  }
        );
            
        } catch (err) {
            setErr(true);
        }
       
    }
    
  return (
      <div className='formContainer'>
          <div className='formWrapper'>
              <span className='logo'>💌 App Chat 📱</span>
              <span className='title'>Register</span>
              <form onSubmit={handleSubmit}>
                  <input type="text" placeholder='display name' />
                  <input type="email" placeholder='email' />
                  <input type="password" placeholder='password' />
                  <input type="file" id="file" style={{ dispaly: "none" }} />
                  <label htmlFor="file">
                      <img src={Add} alt=">Add Avatar" />
                      <span>Add an avatar</span>
                  </label>
                  <button>Sign up</button>
                  {err && <span>Something went wrong ❌❌❌ Try Again👀</span>}
              </form>
              <p> You do have an account ?<Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}
export default Register;