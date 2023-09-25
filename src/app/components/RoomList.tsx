export default function RoomList (rooms: string[] | null): JSX.Element {
    console.log(rooms)
    return (
        <ul>
            <p>your rooms:</p>
            <ul>
            {rooms.rooms.map((room:string, index:number) => {
                return <li key={index}>{room}</li>
            })}
            </ul>
        </ul>
    )
}