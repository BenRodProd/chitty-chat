import writeToChat from "@/service/writeChat";
import Image from "next/image";
import styled from "styled-components";

const StyledInput = styled.input`
    height:5rem;
    width: 50%;
    background-color: rgba(255,255,255,0.7);
    margin: 0 1rem;
`
const StyledForm = styled.form`
    display:flex;
    justify-self: center;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.1);
    width: 100%;
    align-self: center;
    margin: 1rem;
    padding: 1rem;
`

export default function ChatInput ({user, room, userAvatar}:{userAvatar: string, user:string, room:string}) {
    const handleChatSubmit = (e: any) => {
        e.preventDefault();
        writeToChat(user, userAvatar, room, e.target.text.value);
        e.target.text.value="";
        
    }
    return (
        <>
        <StyledForm onSubmit={(e)=>handleChatSubmit(e)}>
        <Image src = {userAvatar} width="50" height="50" alt="UserAvatar" />
            <StyledInput type="text" name="text" max="1000"/>
            <button type ="submit">Send</button>
        </StyledForm>
        </>
    )
}