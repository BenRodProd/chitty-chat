import saveToDatabase from '@/service/writeUserInfo';
import styled from 'styled-components';

const IntroDiv = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
border: 3px black solid;
padding: 1rem;
border-radius: 12px;
align-self: center;
justify-self: center;
align-items:center;
justify-content:center;
gap: 1rem;
border-radius:12px;
z-index:20;
margin:auto;
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
z-index:14;
`

const StyledInput = styled.input`

    height:3rem;
    width: 50%;
    background-color: rgba(255,255,255,0.7);
    margin: 0 1rem;
    z-index:12;
    border-radius: 12px;
    text-align: center;
`

export default function Introduction({userEmail, userName, setNickName} : {userEmail: string, userName: string, setNickName: any}): JSX.Element {
  
   async function handleNewNickName(e: any, userEmail: string) {
        e.preventDefault();
      
        await setNickName(e.target.nickname.value)
        await saveToDatabase(userEmail, "nick", e.target.nickname.value)
        saveToDatabase(userEmail, "email", userEmail)

    }
    return (
        <IntroDiv>
            <h1>Welcome to ChittyChat</h1>
            <h2>Hallo {userName}, please choose a Nickname:</h2>
            <form onSubmit={(e)=> handleNewNickName(e, userEmail)}>
                <StyledInput type="text" placeholder="Nickname" name="nickname"/>
                <StyledButton type="submit">OK</StyledButton>
            </form>
        </IntroDiv>
    );
}