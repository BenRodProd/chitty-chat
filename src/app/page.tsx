"use client"
import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import { auth } from '@/service/firebase';
import Login from '@/service/login';
//import { Footer } from './components/Styles';
//import LoadingScreen from './components/LoadingScreen';

interface User {
  id:string,
  name:string,
  email:string,
  friends:string[]
}

export default function Home(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser as User); // Set the user object
        setLoggedIn(true);
      } else {
        // User is signed out
        setUser(null); // Clear the user object
        setLoggedIn(false);
        
      }
    });
    
    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  
  console.log(user)

  return (
    <>
      {loggedIn ? <Main user={user} /> : <Login />}
      <footer>(c) 2023 BenRodProd</footer>
    </>
  );
}
