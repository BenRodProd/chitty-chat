import writeToChat from "@/service/writeChat";
import { useEffect, useState } from "react";
import { conversationData } from "../kittytalk/conversation";

export default function KittyChat({ messages, setMessages, messageBoxRef, room }: { room: any, messages: any, setMessages: any, messageBoxRef: any }) {
  const [canKittyRespond, setCanKittyRespond] = useState(true);
  const [conversationState, setConversationState] = useState("ALL");

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    const isKittyMessage =
      latestMessage.user[0] === "Kitty" || latestMessage.avatar[0] === "/assets/kittyavatar.jpg";

    if (!isKittyMessage && canKittyRespond) {
      let kittyResponse = "";
      let newState = conversationState;
      const cleanText = latestMessage.text[0].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();

      // Split the latest message into words
      const words = cleanText.split(" ");

      if (conversationState === "ALL") {
        const responsesWithNoState = conversationData.filter((conversation) => !conversation.STATE);

        for (const word of words) {
          const matchingResponses = responsesWithNoState.filter((conversation) =>
            conversation.buzzwords.some((buzzword) => word.includes(buzzword.toLowerCase()))
          );

          if (matchingResponses.length > 0) {
            const randomResponse = matchingResponses[Math.floor(Math.random() * matchingResponses.length)];
            kittyResponse = randomResponse.responses[Math.floor(Math.random() * randomResponse.responses.length)];

            if (randomResponse.NEXT) {
              newState = randomResponse.NEXT;
            }
            break; // Exit the loop when a match is found
          }
        }
      } else {
        for (const word of words) {
          for (const conversation of conversationData) {
            let buzzwordMatched = false;
            for (const buzzword of conversation.buzzwords) {
              const cleanBuzzword = buzzword.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();

              if (word.includes(cleanBuzzword) && (!conversation.STATE || conversation.STATE === conversationState)) {
                buzzwordMatched = true;
                const responses = conversation.responses;
                kittyResponse = responses[Math.floor(Math.random() * responses.length)];

                if (conversation.NEXT) {
                  newState = conversation.NEXT;
                }

                break;
              }
            }
            if (buzzwordMatched) {
              break; // Exit the conversation loop when a match is found
            }
          }
          if (kittyResponse) {
            break; // Exit the word loop when a response is found
          }
        }
      }

      if (!kittyResponse) {
        const noiseResponses = conversationData.find((conversation) =>
          conversation.buzzwords.includes("noise")
        );
        if (noiseResponses) {
          const responses = noiseResponses.responses;
          kittyResponse = Math.random() < 0.1 ? "" : responses[Math.floor(Math.random() * responses.length)];
        }
      }

      if (newState !== conversationState) {
        setConversationState(newState);
      }

      setCanKittyRespond(false);

      setTimeout(() => {
        setCanKittyRespond(true);
      }, 3000);

      if (kittyResponse) {
        writeToChat("kitty", "/assets/kittyavatar.jpg", room, kittyResponse);
      }
    }
  }, [messages, canKittyRespond, room, conversationState]);

  return null;
}
