"use client"
import { User } from "../types/types";
export default function CreateRoom ({user, setRooms, rooms} : {user: User, setRooms: any, rooms: string[] | undefined}): JSX.Element {

   function handleCreateRoom(e: any, user: any) {
        e.preventDefault();
        
        // Get the room name from the form input
        const roomName = e.target.roomname.value;

        // Write the room name to Firestore
        
        // Update the rooms state with the new room name
        setRooms((prevRooms: string[] | undefined) =>
        prevRooms !== undefined ? [...prevRooms, roomName] : [roomName]
        );
       
    }

    return (
        <>
            <form onSubmit={(e) => handleCreateRoom(e, user)}>
                <input type="text" placeholder="RoomName" name="roomname" />
                <button type="submit">OK</button>
            </form>
        </>
    );
}
