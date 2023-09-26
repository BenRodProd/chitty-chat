import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import Kitty from "./Kitty";
import Image from "next/image";
import { onSnapshot, query, collection, orderBy, limit, where, QueryDocumentSnapshot } from 'firebase/firestore';
import { firestore } from '@/service/firebase';
import styled from "styled-components";


const ChatBubble = styled.div`
display: flex;
  width: 50%;
  border: 3px black solid;
  background-color: lightgreen;
  text-align: center;
  align-self: ${(props) => (props.$isCurrentUser ? "flex-end" : "flex-start")};
  z-index:0;
  margin-bottom:1rem;
`

const ChatRoomStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightblue;
  border: 3px black solid;
  padding: 1rem;
height: 100%;
z-index:-10;
`
const MessageBox = styled.div`
  display:flex;
  flex-direction: column;
  height: 60%;
  overflow-y: auto;

`

const RoomHeader = styled.p`
  font-size: 3rem;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.5rem;
`

export default function ShowRoom ({ userNick, userAvatar, activeRoom, user }: { userNick:string, userAvatar: string, activeRoom: string, user: any }) {
  const [messages, setMessages] = useState<{ id: string, [key: string]: any }[]>([]);

  useEffect(() => {
    // Define the Firestore query for the chat messages
    const messagesQuery = query(
      collection(firestore, 'chat'),
      where('room', 'array-contains-any', [activeRoom]), // Filter messages by the active room
      orderBy('timestamp'), // Order messages by timestamp
      limit(50) // Limit to the last 50 messages (adjust as needed)
    );

    // Set up a real-time listener for the chat messages
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const updatedMessages = [] as { id: string, [key: string]: any }[];
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        updatedMessages.push({ id: doc.id, ...data });
      });
      setMessages(updatedMessages);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [activeRoom, user]);



  return (
    <ChatRoomStyle>
      <RoomHeader>{activeRoom}</RoomHeader>
      <MessageBox>
      {messages.map((message) => (
        <ChatBubble key={message.id} $isCurrentUser={message.user === userNick ? "true" : "false"}>
          <Image src={message.avatar[0]} width="50" height="50" alt="userAvatar" />
          <p>{message.user}: 
         {" "} {message.text}</p>
        </ChatBubble>
      ))}
      </MessageBox>
      <ChatInput user={userNick} userAvatar={userAvatar} room={activeRoom} />
      <Kitty />
    </ChatRoomStyle>
  );
}
