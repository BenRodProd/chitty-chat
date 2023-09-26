"use client"
import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import { auth } from '@/service/firebase';
import Login from '@/service/login';
import { User } from "./types/types";
import { Settings } from './components/Settings';
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`


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
  
  return (
    <MainDiv>
    
      {loggedIn ? <Main user={user as User} /> : <Login />}
     
      <footer>(c) 2023 BenRodProd</footer>
    </MainDiv>
  );
}
