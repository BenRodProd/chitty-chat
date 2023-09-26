"use client"
import React, { useState, useEffect } from 'react';
import Main from './components/Main';
import { auth } from '@/service/firebase';
import Login from '@/service/login';
import { User } from "./types/types";
import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index:-12;
`

const StyledFooter = styled.footer`
  display: flex;
  text-align: center;
  justify-content: center;
  z-index: 0;
  position: absolute;
  bottom:0;
  width: 100%;
  font-size: 0.8rem;
  font-weight: bold;
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
     
      <StyledFooter>(c) 2023 BenRodProd</StyledFooter>
    </MainDiv>
  );
}
