import { useEffect, useState } from "react";
import getAllUserNicknames from "@/service/getAllUsers";
import writeToFirestore from "@/service/writeUserInfo";

export default function FindFriends({userEmail, setFriends, friends} : {userEmail: string, setFriends: any, friends: string[]}): JSX.Element {
    const [allUsers, setAllUsers] = useState<string[]>([]);

   useEffect(() => {
       
       getAllUserNicknames().then((data) => {
     
           setAllUsers(data.map((user) => {

               return user
           }));
           
       })
   },[])

   function handleAddFriend(user: any) {
    // Check if the friend's email is not already in the friends array
    console.log(user)
if (friends) {
    if (!friends.includes(user.email)) {
        setFriends((prevFriends: string[] | undefined) =>
            prevFriends !== undefined ? [...prevFriends, user.email] : [user.email]
        );

        // Optionally, you can also update the database here if needed
        writeToFirestore(userEmail, "friends", [...friends, user.email]);
    } 
    } else {
        writeToFirestore(userEmail, "friends", [user.email]);
    }
}

    return (
        <div>
            
            <h2>Hallo {userEmail}, you have no one in your friendlist.</h2>
            <p>Choose someone to connect with:</p>
            {allUsers.map((user, index) => {
                return <p onClick={() => handleAddFriend(user)} key={index}>{user.nick}</p>
            })}
        </div>
    );
}