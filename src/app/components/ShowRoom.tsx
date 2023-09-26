import React, { useEffect, useState, useRef } from "react";
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
  text-align: left;
  align-self: ${(props) => (props.$isCurrentUser ? "flex-end" : "flex-start")};
  z-index: 1;
  margin-bottom: 1rem;
  padding:0.5rem;
  border-radius: 12px;
`

const DisplayTime = styled.div`
  align-self: flex-end;
  font-size:0.7rem;
  text-align:right;
  width:100%;
  

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
    height: 80%;
  }

`

const RoomHeader = styled.p`
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0.5rem;
  border: 3px black solid;
  border-radius: 12px;
  background-color: l
`

export default function ShowRoom({ userNick, userAvatar, activeRoom, user }: { userNick: string, userAvatar: string, activeRoom: string, user: any }) {
  const [messages, setMessages] = useState<{ id: string, [key: string]: any }[]>([]);
  const messageBoxRef = useRef<HTMLDivElement | null>(null); // Create a ref for the MessageBox

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
        {messages.map((message) => (
        
          <ChatBubble key={message.id} $isCurrentUser={message.user === userNick ? "true" : "false"}>
            <Image src={message.avatar[0]} width="50" height="50" alt="userAvatar" />
            <p>{message.text}</p>
              
              <DisplayTime>{formatTimestamp(message.timestamp)}</DisplayTime>
                      </ChatBubble>
             
        ))}
      </MessageBox>
      <ChatInput user={userNick} userAvatar={userAvatar} room={activeRoom} />
      <Kitty animationCall="no" />
    </ChatRoomStyle>
  );
}
