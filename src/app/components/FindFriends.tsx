import { useEffect, useState } from "react";
import getAllUserNicknames from "@/service/getAllUsers";
import writeToFirestore from "@/service/writeUserInfo";

export default function FindFriends({userEmail, setFriends} : {userEmail: string, setFriends: any}): JSX.Element {
    const [allUsers, setAllUsers] = useState<string[]>([]);
   useEffect(() => {
       
       getAllUserNicknames().then((data) => {
        console.log(data)
           setAllUsers(data.map((user) => {

               return user.nick
           }));
           
       })
   },[])

   function handleAddFriend(user: string) {
    
    setFriends((prevFriends: string[] | undefined) =>
    prevFriends !== undefined ? [...prevFriends, user] : [user]
  );
    writeToFirestore(userEmail, "friends", user);
   }

    return (
        <div>
            
            <h2>Hallo {userEmail}, you have no one in your friendlist.</h2>
            <p>Choose someone to connect with:</p>
            {allUsers.map((user, index) => {
                return <p onClick={() => handleAddFriend(user)} key={index}>{user}</p>
            })}
        </div>
    );
}