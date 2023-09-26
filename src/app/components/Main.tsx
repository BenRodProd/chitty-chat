"use client"
import { User } from '../types/types';
import getUserInfos from '@/service/getUserInfo';
import { useEffect, useState } from 'react';
import Introduction from './Introduction';
import FindFriends from './FindFriends';
import FriendList from './FriendList';
import CreateRoom from './CreateRoom';
import RoomList from './RoomList';
import { Settings } from './Settings';
import writeToFirestore from '@/service/writeUserInfo';
import ChooseAvatar from './ChooseAvatar';
import Kitty from './Kitty';
import ShowRoom from './ShowRoom';
import Image from 'next/image';

export default function Main({ user }: { user: User}  ): JSX.Element {
  const [userNick, setUserNick] = useState<string>();
  const [userFriends, setUserFriends] = useState<string[]>();
const [userRooms, setUserRooms] = useState<string[]>();
  const [settings, setSettings] = useState<boolean>(false);
const [userAvatar, setUserAvatar] = useState<string>();
const [activeRoom, setActiveRoom] = useState<string>();
  useEffect(() => {
    if (userFriends) {
      writeToFirestore(user.email, "friends", userFriends);
    }
  }, [userFriends, user.email]);


useEffect(() => {
  if (userRooms) {
    writeToFirestore(user.email, "rooms", userRooms);
  }
},[userRooms, user.email])

useEffect(() => {
  if (userAvatar) {
    writeToFirestore(user.email, "avatar", userAvatar);
  }
},[userAvatar, user.email])


useEffect(() => {
  
  getUserInfos(user.email)
  .then((data) => {
console.log(data)
    if (data && data.nick) {
      setUserNick(data.nick)
    }
    if (data && data.friends) {
      setUserFriends(data.friends)
    }
    if (data && data.avatar) {
      setUserAvatar(data.avatar)
    }
    if (data && data.rooms) {
      setUserRooms(data.rooms)
    }

  })
},[user])



if (!userNick) return (
  <Introduction userEmail={user.email} userName={user.displayName} setNickName={setUserNick}/>
)
if (!userFriends) return (
  <FindFriends userEmail={user.email} setFriends={setUserFriends} friends={userFriends}/>
)
if (!userRooms) return (
  <CreateRoom user={user} setRooms={setUserRooms} rooms={userRooms}/>
)
if (!userAvatar) return (
  <ChooseAvatar avatar={userAvatar} setAvatar={setUserAvatar}/>
)

console.log("user", user.email, "nichname", userNick, "friends", userFriends)

  return (
    <>
    <button type="button" onClick = {()=>setSettings(prev => !prev)} >Settings</button>
     {settings && <Settings avatar={userAvatar} setAvatar={setUserAvatar} friends={userFriends} rooms={userRooms} user={user} setRooms={setUserRooms} setFriends={setUserFriends} />}
      <Image src={userAvatar} alt="avatar" width={100} height={100}/>
      <FriendList friends={userFriends}/>
      <RoomList rooms={userRooms} setActiveRoom={setActiveRoom}/>
      {activeRoom && <ShowRoom userNick={userNick} userAvatar={userAvatar} user={user} activeRoom={activeRoom}/>}
      
    </>
  );

}
