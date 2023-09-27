import writeToChat from "@/service/writeChat";
import { serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { conversationData } from "../kittytalk/conversation";

export default function KittyChat({ messages, setMessages, messageBoxRef, room }: { room: any, messages: any, setMessages: any, messageBoxRef: any }) {
  const [canKittyRespond, setCanKittyRespond] = useState(true);

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    const isKittyMessage =
      latestMessage.user[0] === "Kitty" || latestMessage.avatar[0] === "/assets/kittyavatar.jpg";

    if (!isKittyMessage && canKittyRespond) {
      let kittyResponse = ""; // Default response initially empty

      // Check buzzwords in the latest user message
      for (const conversation of conversationData) {
        for (const buzzword of conversation.buzzwords) {
          if (latestMessage.text[0].toLowerCase().includes(buzzword.toLowerCase())) {
            // Select a random response from the matched conversation
            const responses = conversation.responses;
            kittyResponse = responses[Math.floor(Math.random() * responses.length)];
            break;
          }
        }
        if (kittyResponse) {
          // A buzzword matched, exit the loop
          break;
        }
      }

      if (!kittyResponse) {
        // No buzzwords matched, check if there are "noise" responses
        const noiseResponses = conversationData.find(conversation => conversation.buzzwords.includes("noise"));
        if (noiseResponses) {
          const responses = noiseResponses.responses;
          // Give Kitty a 1:3 chance of not responding (by setting response to an empty string)
          kittyResponse = Math.random() < 0.1 ? "" : responses[Math.floor(Math.random() * responses.length)];
        }
      }

      if (kittyResponse) {
        writeToChat("kitty", "/assets/kittyavatar.jpg", room, kittyResponse);
      }

      setCanKittyRespond(false); // Prevent Kitty from responding for a moment

      setTimeout(() => {
        setCanKittyRespond(true); // Allow Kitty to respond again after a delay
      }, 3000); // 1000 milliseconds = 1 second
    }
  }, [messages, canKittyRespond, room]);

  return null; // You can return null or any other suitable content
}
