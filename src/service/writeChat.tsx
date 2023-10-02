import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from './firebase'; // Import your Firestore instance
import { v4 } from 'uuid';
export default async function writeToChat(username: string, userAvatar:string, room: string, text: any) {
  // Define the Firestore document reference
  const uuid = v4()

  const userDocRef = doc(firestore, 'chat', uuid); // Assuming 'username' is the document ID

  try {
    // Check if the document exists
    const docSnapshot = await getDoc(userDocRef);

    // Document doesn't exist, create a new one
    
      await setDoc(userDocRef, {
        room: [room],
        text: [text],
        user: [username],
        avatar: [userAvatar],
        timestamp: serverTimestamp(), // Set the timestamp to the server time
        
      });
      
  } catch (error) {
    console.error('Error writing to Firestore:', error);
  }
}