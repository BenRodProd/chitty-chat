export default function RoomList ({rooms, setActiveRoom}:{rooms: string[] | null, setActiveRoom:any}): JSX.Element {
    console.log(rooms)
    return (
        <ul>
            <p>your rooms:</p>
            <ul>
            {rooms.map((room:string, index:number) => {
                return <li onClick={() => setActiveRoom(room)} key={index}>{room}</li>
            })}
            </ul>
        </ul>
    )
}