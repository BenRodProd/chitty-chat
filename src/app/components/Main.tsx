"use client"
import { User } from '../types/types';
import getUserInfos from '@/service/getUserInfo';
import { useEffect, useState } from 'react';
import Introduction from './Introduction';
import FindFriends from './FindFriends';

export default function Main({ user }: { user: User}  ): JSX.Element {
  const [userNick, setUserNick] = useState<string>();
  const [userFriends, setUserFriends] = useState<string[]>();

  
useEffect(() => {
  
  getUserInfos(user.email)
  .then((data) => {

    if (data && data.nick) {
      setUserNick(data.nick)
    }
    if (data && data.friends) {
      setUserFriends(data.friends)
    }
  })
},[])

if (!userNick) return (
  <Introduction userEmail={user.email} userName={user.displayName} setNickName={setUserNick}/>
)
if (!userFriends) return (
  <FindFriends userEmail={user.email} setFriends={setUserFriends}/>
)

console.log("user", user.email, "nichname", userNick, "friends", userFriends)

  return (
    <>
      
    </>
  );
}
