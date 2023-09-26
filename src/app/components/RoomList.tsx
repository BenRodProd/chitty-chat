export default function RoomList ({rooms, setActiveRoom}:{rooms: string[] | null, setActiveRoom:any}): JSX.Element {
    console.log(rooms)
    return (
        <div>
            <h3>your rooms:</h3>
            <hr></hr>
            <ul>
            {rooms.map((room:string, index:number) => {
                return <li onClick={() => setActiveRoom(room)} key={index}>{room}</li>
            })}
            </ul>
        </div>
    )
}