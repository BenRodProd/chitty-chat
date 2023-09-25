import getUserInfos from "@/service/getUserInfo";
import { useEffect, useState } from "react";

export default function FriendList({ friends }: { friends: string[] | null }): JSX.Element {
  const [friendNicknames, setFriendNicknames] = useState<string[]>([]);
console.log(friends)
  useEffect(() => {
    if (friends && friends.length > 0) {
      const fetchFriendNicknames = async () => {
        const nicknames = await Promise.all(
          friends.map(async (friendEmail) => {
            const userData = await getUserInfos(friendEmail);
            return userData.nick || "No Nickname"; // Handle cases where nick is not available
          })
        );
        setFriendNicknames(nicknames);
      };

      fetchFriendNicknames();
    }
  }, [friends]);

  return (
    <ul>
      <p>Your friends:</p>
      {friendNicknames.map((nickname, index) => (
        <li key={index}>{nickname}</li>
      ))}
    </ul>
  );
}
