import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase'; // Import your Firestore instance

// Define a function to fetch all user nicknames from Firestore
async function getAllUserNicknames() {
  try {
    const userCollectionRef = collection(firestore, 'user'); // Reference to the "user" collection
    const querySnapshot = await getDocs(userCollectionRef);

  const allUsers: any[] = [];

    querySnapshot.forEach((docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
       allUsers.push(userData);
       
    }
});
return allUsers;
    
  } catch (error) {
    console.error('Error fetching:', error);
    throw error; // Handle the error appropriately
  }
}

export default getAllUserNicknames;
