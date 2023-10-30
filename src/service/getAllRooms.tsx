import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase'; // Import your Firestore instance

// Define a function to fetch all user nicknames from Firestore
async function getAllRooms() {
  try {
    const userCollectionRef = collection(firestore, 'user'); // Reference to the "user" collection
    const querySnapshot = await getDocs(userCollectionRef);

    const allRooms: any[] = [];

    querySnapshot.forEach((docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        allRooms.push(userData.rooms);
      }
    });
    return allRooms;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error; // Handle the error appropriately
  }
}

export default getAllRooms;
