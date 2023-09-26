"use client"
import { auth } from "@/service/firebase"
import { useState } from "react"
import FindFriends from "./FindFriends"
import CreateRoom from "./CreateRoom"
import ChooseAvatar from "./ChooseAvatar"
import styled from "styled-components"

const Backdrop = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
height:100vh;
width:100vw;
position:absolute;
z-index:2;
top:0;
left:0;

background-color:rgba(0,0,0,0.5);
backdrop-filter:blur(2px);
`

const StyledButton = styled.button`
display:flex;
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
const CloseButton = styled.div`
display:flex;
position:absolute;
right:0;
top:0;
background-color:red;
border: none;
color: white;
padding: 2px 12px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 13px;
font-weight: bold;
margin: 4px 2px;
cursor: pointer;
border-radius: 12px;
z-index:14;
`

const SettingsWindow = styled.div`
display:flex;
position: relative;
user-select: none;
flex-direction: column;
align-items: center;
justify-content: center;
border: 3px black solid;
padding: 1rem;
border-radius: 12px;
z-index:13;
top:0;
left:0;
background-color:rgba(255,255,255,255.5);
overflow-y: auto;
`

export function Settings({user, setRooms, setSettings, setFriends, friends, rooms, avatar, setAvatar}: {setSettings: any, user: any, setRooms: any, setFriends: any, friends: string[], rooms: string[] | undefined, avatar: string | undefined, setAvatar: any}): JSX.Element {
const [addFriend, setAddFriend] = useState(false)
const [addRoom, setAddRoom] = useState(false)
const [changeAvatar, setChangeAvatar] = useState(false)

function handleChangeAvatar() {
    setChangeAvatar(prev => !prev)
    setAddFriend(false)
    setAddRoom(false)
}
function handleShowFriends() {
    setAddFriend(prev => !prev)
    setAddRoom(false)
    setChangeAvatar(false)
}
function handleShowRoom() {
    setAddRoom(prev => !prev)
    setAddFriend(false)
    setChangeAvatar(false)
}



    return (
        <Backdrop>
            <SettingsWindow>
                <CloseButton onClick={() => setSettings(false)}>X</CloseButton>
    
    <StyledButton type="button" onClick={() => handleShowFriends()}>Add Friend</StyledButton>
    {addFriend && <FindFriends friends={friends} userEmail={user.email} setFriends={setFriends}/>}
    <StyledButton type="button" onClick={() => handleShowRoom()}>Add Room</StyledButton>
    {addRoom && <CreateRoom rooms={rooms} user={user} setRooms={setRooms}/>}
    <StyledButton type="button" onClick={() => handleChangeAvatar()}>Change Avatar</StyledButton>
    {changeAvatar && avatar && <ChooseAvatar avatar={avatar} setAvatar={setAvatar} handleChangeAvatar={handleChangeAvatar}/>}
    <StyledButton type="button" onClick={() => auth.signOut()}>Logout</StyledButton>
    </SettingsWindow>
    </Backdrop>
    )
}