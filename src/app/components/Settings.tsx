"use client"
import { auth } from "@/service/firebase"
import { useState } from "react"
import FindFriends from "./FindFriends"
import CreateRoom from "./CreateRoom"
import ChooseAvatar from "./ChooseAvatar"
export function Settings({user, setRooms, setFriends, friends, rooms, avatar, setAvatar}: {user: any, setRooms: any, setFriends: any, friends: string[], rooms: string[] | undefined, avatar: string, setAvatar: any}): JSX.Element {
const [addFriend, setAddFriend] = useState(false)
const [addRoom, setAddRoom] = useState(false)
const [changeAvatar, setChangeAvatar] = useState(false)
    return (
        <>
    <div>Settings</div>
    <button type="button" onClick={() => setAddFriend(prev => !prev)}>Add Friend</button>
    <button type="button" onClick={() => setAddRoom(prev => !prev)}>Add Room</button>
    <button type="button" onClick={() => setChangeAvatar(prev => !prev)}>Change Avatar</button>
    <button type="button" onClick={() => auth.signOut()}>Logout</button>
    {addFriend && <FindFriends friends={friends} userEmail={user.email} setFriends={setFriends}/>}
    {addRoom && <CreateRoom rooms={rooms} user={user} setRooms={setRooms}/>}
    {changeAvatar && <ChooseAvatar user={user} avatar={avatar} setAvatar={setAvatar}/>}
    </>
    )
}