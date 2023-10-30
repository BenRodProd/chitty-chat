import { useState } from 'react';
import getAllUserNicknames from '@/service/getAllUsers';
import saveToDatabase from '@/service/writeUserInfo';
import styled from 'styled-components';

const IntroDiv = styled.div`
  display: flex;
  flex-direction: column;

  border: 3px black solid;
  padding: 1rem;
  border-radius: 12px;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 12px;
  z-index: 20;
  margin: auto;
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
  margin-top: 1rem;

  cursor: pointer;
  border-radius: 12px;
  z-index: 14;
`;

const StyledInput = styled.input`
  height: 3rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);

  z-index: 12;
  border-radius: 12px;
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default function Introduction({
  userEmail,
  userName,
  setNickName
}: {
  userEmail: string;
  userName: string;
  setNickName: any;
}): JSX.Element {
  const [alertMessage, setAlertMessage] = useState('');
  async function handleNewNickName(e: any, userEmail: string) {
    e.preventDefault();
    await getAllUserNicknames().then(async (data) => {
      const allNicks = data.map((nick) => nick.nick);
      if (allNicks.includes(e.target.nickname.value)) {
        setAlertMessage('This nickname is already taken');
      } else {
        await setNickName(e.target.nickname.value);
        await saveToDatabase(userEmail, 'nick', e.target.nickname.value);
        saveToDatabase(userEmail, 'email', userEmail);
      }
    });
  }
  return (
    <IntroDiv>
      <h1>Welcome to ChittyChat</h1>
      <h2>Hallo {userName}, please choose a Nickname:</h2>
      <StyledForm onSubmit={(e) => handleNewNickName(e, userEmail)}>
        <StyledInput type="text" placeholder="Nickname" name="nickname" />
        <p>{alertMessage}</p>
        <StyledButton type="submit">OK</StyledButton>
      </StyledForm>
    </IntroDiv>
  );
}
