import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase'; // Import your Firestore instance

// Define a function to fetch the user's city and style from Firestore
async function getRoomConversation(userEmail : string, room:string) {
  try {
    const userDocRef = doc(firestore, 'chat', userEmail); // Adjust the collection and document path as needed
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const chat = userData.chat;
      const chatInRoom = chat.filter((item) => item.room === room);
      return { chatInRoom };
    } else {
      return null; // Return null if the user's document is not found
    }
  } catch (error) {
    console.error('Error fetching:', error);
    throw error; // Handle the error appropriately
  }
}

export default getRoomConversation;
