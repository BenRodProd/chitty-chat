import writeToChat from "@/service/writeChat";
import { useEffect, useState } from "react";
import { conversationDatas } from "../kittytalk/conversation";

export default function KittyChat({ messages, setMessages, messageBoxRef, room, user, setAnimationCall }: { user: any, setAnimationCall:any, room: any, messages: any, setMessages: any, messageBoxRef: any }) {
  const [canKittyRespond, setCanKittyRespond] = useState(true);
  const [conversationState, setConversationState] = useState("ALL");
  useEffect(() => {
    
      
      const latestMessage = messages[messages.length - 1];
      const conversationData = conversationDatas(latestMessage);
      
      const isKittyMessage =
        latestMessage.user[0] === "kitty";
     
   

   
 
        if (!isKittyMessage && canKittyRespond && latestMessage && latestMessage.user[0] === user) {
          console.log("response trigger", "latestMessage", latestMessage.user[0], latestMessage.text[0], user);
      let kittyResponse = "";
      let newState = conversationState;
      const cleanText = latestMessage.text[0].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
      
      if (conversationState === "ALL") {
        const responsesWithNoState = conversationData.filter((conversation) => !conversation.STATE);

        for (const conversation of responsesWithNoState) {
          let buzzwordMatched = false;
          
          for (const buzzword of conversation.buzzwords) {
            const cleanBuzzword = buzzword.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
            
            if (cleanText.includes(cleanBuzzword)) {
              buzzwordMatched = true;
              const responses = conversation.responses;
              kittyResponse = responses[Math.floor(Math.random() * responses.length)];
              if(cleanText.includes("kunststück") || cleanText.includes("trick")) {
                console.log("trick trigger")
                setTimeout(() => {
                  
                  setAnimationCall("sit");
                },1000)
                setTimeout(() => {
                  setAnimationCall("follow");
                },3000)
              }
              if (conversation.NEXT) {
                newState = conversation.NEXT;
              }
              break; // Exit the loop when a match is found
            }
          }
          
          if (buzzwordMatched) {
            break; // Exit the conversation loop when a match is found
          }
        }
      } else {
        for (const conversation of conversationData) {
          if (conversation.STATE === conversationState) {
            let buzzwordMatched:boolean = false;
            
            for (const buzzword of conversation.buzzwords) {
              const cleanBuzzword = buzzword.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
              
              if (cleanText.includes(cleanBuzzword)) {
                buzzwordMatched = true;
                const responses = conversation.responses;
                kittyResponse = responses[Math.floor(Math.random() * responses.length)];
                
                if (conversation.NEXT) {
                  newState = conversation.NEXT;
                }
                break; // Exit the loop when a match is found
              }
            }
            
            if (buzzwordMatched) {
              break; // Exit the conversation loop when a match is found
            }
          }
        }
      }
      
      if (!kittyResponse) {
        const noiseResponses = conversationData.find((conversation) =>
        conversation.buzzwords.includes("noise")
        );
        if (noiseResponses) {
          const responses = noiseResponses.responses;
          kittyResponse = Math.random() < 0.5 ? "SILENCIO" : responses[Math.floor(Math.random() * responses.length)];
        }
      }
      
      if (newState !== conversationState) {
        setConversationState(newState);
      }
      
      
      if (kittyResponse && !isKittyMessage) {
        
        writeToChat("kitty", "/assets/kittyavatar.jpg", room, kittyResponse);
        setCanKittyRespond(false);
        setTimeout(() => {
          setCanKittyRespond(true);
        },2000)
      }
    }

  }, [messages]);


  
  return null;
}
