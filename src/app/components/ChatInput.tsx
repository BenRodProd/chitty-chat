import writeToChat from "@/service/writeChat";

export default function ChatInput ({user, room, userAvatar}:{userAvatar: string, user:string, room:string}) {
    const handleChatSubmit = (e: any) => {
        e.preventDefault();
        writeToChat(user, userAvatar, room, e.target.text.value);
        
    }
    return (
        <form onSubmit={(e)=>handleChatSubmit(e)}>
            <input type="text" name="text" max="1000"/>
            <button type ="submit">Send</button>
        </form>
    )
}