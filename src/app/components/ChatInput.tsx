import writeToChat from "@/service/writeChat";
import Image from "next/image";
import styled from "styled-components";

const StyledInput = styled.textarea`
display:flex;
caret-color: black;
caret-shape: bar;
    height:5rem;
    width: 50%;
    background-color: rgba(255,255,255,0.7);
    margin: 0 1rem;
    z-index:12;
padding: 10px;
`
const StyledForm = styled.form`
    display:flex;
    position:absolute;
    justify-self: center;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.1);
    width: 100%;
    align-self: center;
    margin: 1rem;
    padding: 1rem;
    z-index:5;
    bottom:0;
`

export default function ChatInput ({user, room, userAvatar, setTextCoordinates, setTyping}:{userAvatar: string, user:string, room:string, setTextCoordinates:any, setTyping:any}) {
    const handleChatSubmit = (e: any) => {
        e.preventDefault();
        writeToChat(user, userAvatar, room, e.target.text.value);
        e.target.text.value="";
        setTyping(false)
    }
    function getTextCoordinates(e: any) {
        setTextCoordinates(e.target.selectionStart)
        setTyping(true)
    }
    return (
        <>
        <StyledForm onSubmit={(e)=>handleChatSubmit(e)}>
        <Image src = {userAvatar} width="50" height="50" alt="UserAvatar" />
            <StyledInput onInput={(e)=>getTextCoordinates(e)}required autoFocus name="text"  />
            <button type ="submit">Send</button>
        </StyledForm>
        </>
    )
}