import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import Kitty from "./Kitty";
import Image from "next/image";
import { onSnapshot, query, collection, orderBy, limit, where, QueryDocumentSnapshot } from 'firebase/firestore';
import { firestore } from '@/service/firebase';
import getUserInfos from "@/service/getUserInfo";

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

  console.log(messages);

  return (
    <div>
      <h1>{activeRoom}</h1>
      {messages.map((message) => (
        <div key={message.id}>
          <Image src={message.avatar[0]} width="50" height="50" alt="userAvatar" />
          <p>{message.user}</p> 
          <p>{message.text}</p>
        </div>
      ))}
      <ChatInput user={userNick} userAvatar={userAvatar} room={activeRoom} />
      <Kitty />
    </div>
  );
}
