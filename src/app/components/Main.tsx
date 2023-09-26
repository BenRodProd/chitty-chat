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
import ShowRoom from './ShowRoom';
import Image from 'next/image';
import styled from 'styled-components';

const ProfileSection = styled.div`
display: flex;

flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height:20%;
align-self: flex-end;
background-color: aliceblue;

  text-align: center;
z-index:1;

`

const SettingsButton = styled.button`

display:flex;
position:absolute;
left:1px;
top:1px;
background-color: #4CAF50;
border: none;
color: white;
padding: 15px 32px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
border-radius: 12px;
z-index:14;
`
const ProfileLists = styled.div`
display: flex;
justify-content: center;
width:100%;
padding:12px;
background-color: lightblue;
border: 3px black solid;
border-radius: 12px;
`

const MainDiv = styled.div`
display:flex;
flex-direction: column;
position:relative;
width: 100vw;
height:100vh;
overflow: hidden;

`

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
      <MainDiv>
    <SettingsButton type="button" onClick = {()=>setSettings(prev => !prev)}><Image src="/settings.png" alt="settings" width={20} height={20}/></SettingsButton>
     {settings && <Settings setSettings={setSettings} avatar={userAvatar} setAvatar={setUserAvatar} friends={userFriends} rooms={userRooms} user={user} setRooms={setUserRooms} setFriends={setUserFriends} />}
      <ProfileSection>
     
      <ProfileLists>
      <FriendList friends={userFriends}/>
      <RoomList rooms={userRooms} setActiveRoom={setActiveRoom}/>
      </ProfileLists>
      </ProfileSection>
      {activeRoom && <ShowRoom userNick={userNick} userAvatar={userAvatar} user={user} activeRoom={activeRoom}/>}
      
    </MainDiv>

  );

}
