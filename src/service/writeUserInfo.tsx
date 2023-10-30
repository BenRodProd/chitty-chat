import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase'; // Import your Firestore instance

export default async function writeToFirestore(
  username: string,
  typeOfData: string,
  dataToWrite: any
) {
  // Define the Firestore document reference
  const userDocRef = doc(firestore, 'user', username); // Assuming 'username' is the document ID

  try {
    // Check if the document exists
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      // Document exists, update the city
      await updateDoc(userDocRef, { [typeOfData]: dataToWrite });
    } else {
      // Document doesn't exist, create a new one
      await setDoc(userDocRef, { [typeOfData]: dataToWrite });
    }
  } catch (error) {
    console.error(error);
  }
}
