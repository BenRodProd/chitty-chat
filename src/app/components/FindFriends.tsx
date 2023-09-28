import { useEffect, useState } from "react";
import getAllUserNicknames from "@/service/getAllUsers";
import writeToFirestore from "@/service/writeUserInfo";
import styled from "styled-components";

const FriendsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  border: 3px black solid;
  padding: 1rem;
  border-radius: 12px;
  z-index: 0;
  gap:1rem;
`

const FriendSelector = styled.p`
cursor: pointer;
border: 3px black solid;
border-radius: 12px;
padding: 0.5rem;
background-color: lightgreen;
`

export default function FindFriends({
  userEmail,
  setFriends,
  friends,
}: {
  userEmail: string;
  setFriends: any;
  friends: string[];
}): JSX.Element {
  const [allUsers, setAllUsers] = useState<string[]>([]);

  useEffect(() => {
    getAllUserNicknames().then((data) => {
      setAllUsers(data.map((user) => user).filter((user) => user.email));
    });
  }, []);

  function handleAddFriend(user: any) {
    if(!friends) {
      setFriends([user.email])
      writeToFirestore(userEmail, "friends", [user.email]);
    } else if (!friends.includes(user.email)) {
      // Ensure friends is an array
      const updatedFriends =
        Array.isArray(friends) && friends.length > 0
          ? [...friends, user.email]
          : [user.email];

      setFriends(updatedFriends);
     
      // Optionally, you can also update the database here if needed
      writeToFirestore(userEmail, "friends", updatedFriends);
    }
  
  }

  return (
    <FriendsDiv>
      <h2>Füge einen Freund hinzu.</h2>
      
      {allUsers.map((user:any, index) => (
        <FriendSelector onClick={() => handleAddFriend(user)} key={index}>
          {user.nick}
        </FriendSelector>
      ))}
    </FriendsDiv>
  );
}
