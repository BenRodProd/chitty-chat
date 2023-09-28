import styled from "styled-components"

const StyledListItem = styled.li`

display:flex;
background-color: #4CAF50;
border: none;
color: white;
padding: 5px 2px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 12px;
margin: 5px;
cursor: pointer;
border-radius: 12px;
z-index:15;
`

const RoomListStyle = styled.div`
display: flex;
position:relative;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: lightblue;
border: 3px black solid;
border-radius: 12px;
z-index: 2;
width:50%;
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
z-index:1;
`
const RoomTitle = styled.h3`
display:flex;
position:absolute;
top:0;
text-align: center;
justify-self: flex-start;
text-decoration: underline;
`

export default function RoomList ({rooms, setActiveRoom, setSettings, setAddRoom}:{setAddRoom: any, rooms: string[] | undefined, setActiveRoom:any, setSettings:any}): JSX.Element {
function handleChooseRoom (room: string) {

    setActiveRoom(room)
}

function handleRoomButtonClick() {
    setSettings(true)
    setAddRoom(true)
}
    
    return (
        <RoomListStyle>
            <RoomTitle>your rooms:</RoomTitle>
            
            <ul>
            {rooms && rooms.length > 0 && rooms.map((room:string, index:number) => {
                return <StyledListItem onClick={() => handleChooseRoom(room)} key={index}>{room}</StyledListItem>
            })}
            {!rooms || rooms.length === 0 && <StyledButton onClick={()=> handleRoomButtonClick()}>create of choose a room</StyledButton>}
            </ul>
        </RoomListStyle>
    )
}