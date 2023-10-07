import React, { useEffect, useState, useRef } from "react";
import ChatInput from "./ChatInput";
import Kitty from "./Kitty";
import Image from "next/image";
import { onSnapshot, query, collection, orderBy, limit, where, QueryDocumentSnapshot } from 'firebase/firestore';
import { firestore } from '@/service/firebase';
import styled from "styled-components";
import KittyChat from "./KittyChat";

const ChatBubble = styled.div<{ $isCurrentUser: string }>`
  display: flex;
  position:relative;
  width: 50%;
  border: 3px black solid;
  background-color: lightgreen;
  text-align: left;
  align-self: ${(props) => (props.$isCurrentUser==="true" ? "flex-end" : "flex-start")};
  z-index: 1;
  margin-bottom: 1rem;
  padding:0.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  word-wrap: break-word;
  overflow-wrap: break-word;
`

const ChatText = styled.p`
display:inline-block;
width:70%;
    word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`

const DisplayTime = styled.p`
display:inline-block;
position:absolute;
  align-self: flex-end;
  font-size:0.5rem;
  text-align:right;
  width:100%;
  right:3px;
  bottom:0;
  

`

const ChatRoomStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: lightblue;
  border: 3px black solid;
  padding: 0.5rem;
  height: 100%;
  z-index: 0;
`

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 2;
  @media screen and (max-width: 600px) {
    height: 55%;
  }
  @media screen and (min-width: 600px) {
    height: 75%;
  }

`

const RoomHeader = styled.p`
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.5rem;
  border: 3px black solid;
  border-radius: 12px;
  
`

export default function ShowRoom({ userNick, userAvatar, activeRoom, user }: { userNick: string, userAvatar: string, activeRoom: string, user: any }) {
  const [messages, setMessages] = useState<{ id: string, [key: string]: any }[]>([]);
  const [kittyAnimation, setKittyAnimation] = useState<string>("");
  const [textCoordinates, setTextCoordinates] = useState<number>(0);
  const [typing, setTyping] = useState<boolean>(false);
  const [textAreaSize, setTextAreaSize] = useState<number>(0);
  const messageBoxRef = useRef<HTMLDivElement | null>(null); // Create a ref for the MessageBox

  useEffect(() => {
    // Define the Firestore query for the chat messages
    const messagesQuery = query(
      collection(firestore, 'chat'),
      where('room', 'array-contains-any', [activeRoom]), // Filter messages by the active room
      orderBy('timestamp'), // Order messages by timestamp
      limit(500) // Limit to the last 50 messages (adjust as needed)
    );

    // Set up a real-time listener for the chat messages
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const updatedMessages = [] as { id: string, [key: string]: any }[];
      querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
  
          updatedMessages.push({ id: doc.id, ...data });
      
        
      });
     
      setMessages(updatedMessages);

      // Scroll to the bottom of the MessageBox when new messages arrive
      if (messageBoxRef.current) {
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [activeRoom, user]);
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }

  }, [messages]);

  useEffect(() => {
    setKittyAnimation("follow");
    
 
  },[])

  const formatTimestamp = (timestamp: any) => {
  if(timestamp) {
    const date = timestamp.toDate(); // Convert Firebase timestamp to JavaScript Date
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Format the date/time as desired
  }
  };

  return (
    <ChatRoomStyle>
      <RoomHeader>{activeRoom}</RoomHeader>
      <MessageBox ref={messageBoxRef}>
      {messages
  .filter(
    (message) =>
      message.text[0] !== 'SILENCIO' 
  )
  .map((message) => (
    <ChatBubble
      key={message.id}
      $isCurrentUser={message.user[0] === userNick ? 'true' : 'false'}
    >
      <Image src={message.avatar[0]} width="50" height="50" alt="userAvatar" />
      <ChatText>{message.text}</ChatText>
      <DisplayTime>{formatTimestamp(message.timestamp)}</DisplayTime>
    </ChatBubble>
  ))}

      </MessageBox>
      <ChatInput setTextAreaSize={setTextAreaSize} setTyping = {setTyping} setTextCoordinates={setTextCoordinates} user={userNick} userAvatar={userAvatar} room={activeRoom} />
      <Kitty textAreaSize={textAreaSize} setAnimationCall={setKittyAnimation} typing={typing} animationCall={kittyAnimation} textCoordinates={textCoordinates} />
      {messages.length > 0 && <KittyChat user={userNick} setAnimationCall={setKittyAnimation} messages={messages} setMessages={setMessages} messageBoxRef={messageBoxRef} room={activeRoom} />}
    </ChatRoomStyle>
  );
}
