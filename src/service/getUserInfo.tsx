import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase'; // Import your Firestore instance
import { UserData } from '@/app/types/types';
// Define a function to fetch the user's city and style from Firestore
async function getUserInfos(userEmail : string): Promise<UserData | null>  {
  try {
    const userDocRef = doc(firestore, 'user', userEmail); // Adjust the collection and document path as needed
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const nick = userData.nick;
      const friends = userData.friends; 
      const rooms = userData.rooms;
      const avatar= userData.avatar;
      return { nick, friends, rooms, avatar };
    } else {
      return null; // Return null if the user's document is not found
    }
  } catch (error) {
    console.error('Error fetching:', error);
    throw error; // Handle the error appropriately
  }
}

export default getUserInfos;
