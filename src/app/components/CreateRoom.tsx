"use client"
import { useEffect, useState } from "react";
import { User } from "../types/types";
import styled from "styled-components";
import getAllRooms from "@/service/getAllRooms";

const StyledRoomChoice = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: lightblue;
    margin: 1rem;
    border: 3px black solid;
    padding: 1rem;
    border-radius: 12px;
    z-index:1;
    top:0;
    left:0;
    gap: 1rem;
`

const RoomSelector = styled.p`
    cursor: pointer;
    border: 3px black solid;
    border-radius: 12px;
    padding: 0.5rem;
    background-color: lightgreen;
`

const RoomList = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
gap: 1rem;
`

export default function CreateRoom ({user, setRooms, rooms} : {user: User, setRooms: any, rooms: string[] | undefined}): JSX.Element {
const [allRooms, setAllRooms] = useState<string[] | undefined>();

useEffect(() => {
    getAllRooms().then(data => {
      // Erstelle ein Set mit eindeutigen Werten und konvertiere es dann zurück in ein Array
      const uniqueRooms = [...new Set(data.flat())];
      setAllRooms(uniqueRooms);
    });
  }, []);

   function handleCreateRoom(e: any, user: any) {
        e.preventDefault();
        
        // Get the room name from the form input
        const roomName = e.target.roomname.value;

        // Write the room name to Firestore
        
        // Update the rooms state with the new room name
        if (!allRooms?.includes(roomName)){
        setRooms((prevRooms: string[] | undefined) =>
        prevRooms !== undefined ? [...prevRooms, roomName] : [roomName]
        )
    }
       
    }

function handleChooseRoom(room: string) {
    if (!rooms?.includes(room)) {
    setRooms((prevRooms: string[] | undefined) => prevRooms !== undefined ? [...prevRooms, room] : [room])
}
}

    return (
        <StyledRoomChoice>
        <h2>Create new Room</h2>
            <form onSubmit={(e) => handleCreateRoom(e, user)}>
                <input type="text" placeholder="RoomName" name="roomname" />
                <button type="submit">OK</button>
            </form>
            <hr/>
            {allRooms && <h2>select a room to add:</h2>}
            <RoomList>
            {allRooms && allRooms.map((room:string, index:number) => {
                return <RoomSelector onClick = {() => handleChooseRoom(room)} key={index}>{room}</RoomSelector>
            })}
            </RoomList>

        </StyledRoomChoice>
    );
}
