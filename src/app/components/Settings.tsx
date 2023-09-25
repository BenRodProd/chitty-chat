"use client"
import { auth } from "@/service/firebase"
import { useState } from "react"
import FindFriends from "./FindFriends"
import CreateRoom from "./CreateRoom"
export function Settings({user, setRooms, setFriends, friends, rooms}): JSX.Element {
const [addFriend, setAddFriend] = useState(false)
const [addRoom, setAddRoom] = useState(false)
    return (
        <>
    <div>Settings</div>
    <button type="button" onClick={() => setAddFriend(prev => !prev)}>Add Friend</button>
    <button type="button" onClick={() => setAddRoom(prev => !prev)}>Add Room</button>
    <button type="button" onClick={() => auth.signOut()}>Logout</button>
    {addFriend && <FindFriends friends={friends} userEmail={user.email} setFriends={setFriends}/>}
    {addRoom && <CreateRoom rooms={rooms} user={user} setRooms={setRooms}/>}
    </>
    )
}