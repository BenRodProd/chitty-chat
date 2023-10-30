import writeToChat from '@/service/writeChat';
import { useEffect, useState } from 'react';
import { conversationDatas } from '../kittytalk/conversation';

export default function KittyChat({
  messages,
  setMessages,
  messageBoxRef,
  room,
  user,
  setAnimationCall
}: {
  user: any;
  setAnimationCall: any;
  room: any;
  messages: any;
  setMessages: any;
  messageBoxRef: any;
}) {
  const [canKittyRespond, setCanKittyRespond] = useState(true);
  const [conversationState, setConversationState] = useState('ALL');

  const latestMessage = messages[messages.length - 1];
  const conversationData = conversationDatas(latestMessage);

  const isKittyMessage = latestMessage.user[0] === 'kitty';

  if (!isKittyMessage && canKittyRespond && latestMessage && latestMessage.user[0] === user) {
    let kittyResponse = '';
    let newState = conversationState;
    const cleanText = latestMessage.text[0]
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .toLowerCase();

    if (conversationState === 'ALL') {
      const responsesWithNoState = conversationData.filter((conversation) => !conversation.STATE);

      for (const conversation of responsesWithNoState) {
        let buzzwordMatched = false;

        for (const buzzword of conversation.buzzwords) {
          const cleanBuzzword = buzzword.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();

          // Check if the buzzword matches exactly
          if (cleanText.includes(cleanBuzzword)) {
            buzzwordMatched = true;
            const responses = conversation.responses;
            kittyResponse = responses[Math.floor(Math.random() * responses.length)];

            if (conversation.ANIMATION) {
              setTimeout(() => {
                setAnimationCall(conversation.ANIMATION);
              }, 1000); // Adjust the delay as needed
            }
            if (conversation.NEXT) {
              newState = conversation.NEXT;
            }
            break; // Exit the loop when an exact match is found
          }
        }

        if (buzzwordMatched) {
          break; // Exit the conversation loop when an exact match is found
        }
      }

      if (!kittyResponse) {
        const responsesWithNoState = conversationData.filter((conversation) => !conversation.STATE);
        for (const conversation of responsesWithNoState) {
          let buzzwordMatched = false;
          for (const buzzword of conversation.buzzwords) {
            const cleanBuzzword = buzzword
              .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
              .toLowerCase();
            // Split the text into words and check if any single word matches
            const words = cleanText.split(' ');
            if (words.includes(cleanBuzzword)) {
              buzzwordMatched = true;
              const responses = conversation.responses;
              kittyResponse = responses[Math.floor(Math.random() * responses.length)];
              if (conversation.ANIMATION) {
                setTimeout(() => {
                  setAnimationCall(conversation.ANIMATION);
                }, 1000); // Adjust the delay as needed
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
      }
    } else {
      for (const conversation of conversationData) {
        if (conversation.STATE === conversationState) {
          let buzzwordMatched = false;

          for (const buzzword of conversation.buzzwords) {
            const cleanBuzzword = buzzword
              .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
              .toLowerCase();

            // Check if the buzzword matches exactly
            if (cleanText.includes(cleanBuzzword)) {
              buzzwordMatched = true;
              const responses = conversation.responses;
              kittyResponse = responses[Math.floor(Math.random() * responses.length)];

              if (conversation.NEXT) {
                newState = conversation.NEXT;
              }
              break; // Exit the loop when an exact match is found
            }
          }

          if (buzzwordMatched) {
            break; // Exit the conversation loop when an exact match is found
          }
        }
      }
    }

    if (!kittyResponse) {
      const noiseResponses = conversationData.find((conversation) =>
        conversation.buzzwords.includes('noise')
      );
      if (noiseResponses) {
        const responses = noiseResponses.responses;
        kittyResponse =
          Math.random() < 0.5
            ? 'SILENCIO'
            : responses[Math.floor(Math.random() * responses.length)];
      }
    }

    if (newState !== conversationState) {
      setConversationState(newState);
    }

    if (kittyResponse && !isKittyMessage) {
      setCanKittyRespond(false);
      writeToChat('kitty', '/assets/kittyavatar.jpg', room, kittyResponse);
      setTimeout(() => {
        setCanKittyRespond(true);
      }, 3000);
    }
  }

  return null;
}
