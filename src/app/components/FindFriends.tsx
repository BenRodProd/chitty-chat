import { useEffect, useState } from "react";
import getAllUserNicknames from "@/service/getAllUsers";
import writeToFirestore from "@/service/writeUserInfo";

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
      setAllUsers(data.map((user) => user));
    });
  }, []);

  function handleAddFriend(user: any) {
    if (!friends.includes(user.email)) {
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
    <div>
      <h2>Hallo {userEmail}, you have no one in your friendlist.</h2>
      <p>Choose someone to connect with:</p>
      {allUsers.map((user, index) => (
        <p onClick={() => handleAddFriend(user)} key={index}>
          {user.nick}
        </p>
      ))}
    </div>
  );
}
