"use client"
import { User } from '../types/types';
import getUserInfos from '@/service/getUserInfo.tsx';
import { useState } from 'react';
import Introduction from './Introduction';

export default function Main({ user }: { user: User}  ): JSX.Element {
  const [userNick, setUserNick] = useState<string>();
  const [userFriends, setUserFriends] = useState<string[]>();

  
  console.log("mainuser", user);
    getUserInfos(user.email)
    .then((data) => {
      console.log(data)
      if (data && data.nick) {
        setUserNick(data.nick)
      }
      if (data && data.friends) {
        setUserFriends(data.friends)
      }
    })

if (!userNick) return (
  <Introduction userEmail={user.email} userName={user.displayName} setNickName={setUserNick}/>
)
    
  return (
    <>
      
    </>
  );
}
