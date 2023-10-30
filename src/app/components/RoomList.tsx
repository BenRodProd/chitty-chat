import writeToFirestore from '@/service/writeUserInfo';
import styled from 'styled-components';

const StyledListItem = styled.li`
  display: flex;
  background-color: #4caf50;
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
  z-index: 15;
`;

const RoomListStyle = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  border: 3px black solid;
  border-radius: 12px;
  z-index: 2;
  width: 50%;
  overflow-y: auto;
  height: 100%;
`;
const StyledButton = styled.button`
  display: flex;
  background-color: #4caf50;
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
  z-index: 1;
`;
const RoomTitle = styled.h3`
  display: flex;
  position: absolute;
  top: 0;

  text-align: center;
  justify-self: flex-start;
  text-decoration: underline;
`;

const StyledUL = styled.ul`
  margin-top: 1rem;
`;

export default function RoomList({
  rooms,
  setActiveRoom,
  setSettings,
  setAddRoom,
  user
}: {
  user: any;
  setAddRoom: any;
  rooms: string[] | undefined;
  setActiveRoom: any;
  setSettings: any;
}): JSX.Element {
  function handleChooseRoom(room: string) {
    writeToFirestore(user.email, 'activeRoom', room);
    setActiveRoom(room);
  }

  function handleRoomButtonClick() {
    setSettings(true);
    setAddRoom(true);
  }

  return (
    <RoomListStyle>
      <RoomTitle>Räume:</RoomTitle>

      <StyledUL>
        {rooms &&
          rooms.length > 0 &&
          rooms.map((room: string, index: number) => {
            return (
              <StyledListItem onClick={() => handleChooseRoom(room)} key={index}>
                {room}
              </StyledListItem>
            );
          })}
        {!rooms ||
          (rooms.length === 0 && (
            <StyledButton onClick={() => handleRoomButtonClick()}>Erstelle einen Raum</StyledButton>
          ))}
      </StyledUL>
    </RoomListStyle>
  );
}
