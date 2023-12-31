import getUserInfos from '@/service/getUserInfo';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserData } from '../types/types';
const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 5px 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 5px;
  cursor: pointer;
  border-radius: 12px;
  z-index: 15;
`;
const FriendListStyle = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  border: 3px black solid;
  border-radius: 12px;
  z-index: 2;
  width: 50%;
  user-select: none;
  overflow-x: auto;

  height: 100%;
`;

const FriendTitle = styled.h3`
  display: flex;

  text-align: center;
  justify-self: flex-start;
  text-decoration: underline;
`;

const StyledUl = styled.ul``;
const StyledButton = styled.button`
  display: flex;
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  z-index: 1;
`;
export default function FriendList({
  friends,
  setSettings,
  setAddFriends
}: {
  setSettings: any;
  setAddFriends: any;
  friends: string[] | null;
}): JSX.Element {
  const [friendData, setFriendData] = useState<{ nickname: string; avatar: string }[]>([]);

  useEffect(() => {
    // Define an async function to fetch user data for a single friend
    const fetchFriendData = async (friendEmail: string) => {
      const userData = (await getUserInfos(friendEmail)) as UserData | null;
      if (userData) {
        const { nick, avatar } = userData;
        return { nickname: nick || 'No Nickname', avatar: avatar || '/assets/avartar34.jpg' };
      } else {
        // Handle the case where userData is null (user not found)
        // You can return a default value or handle it as needed.
      }
    };

    // Use Promise.all to fetch data for all friends in parallel
    const fetchDataForAllFriends = async () => {
      if (friends && friends.length > 0) {
        const data = (await Promise.all(friends.map(fetchFriendData))) as {
          nickname: string;
          avatar: string;
        }[];
        setFriendData(data);
      }
    };

    fetchDataForAllFriends(); // Call the async function to fetch data
  }, [friends]);

  function handleAddFriendsClick() {
    setSettings(true);
    setAddFriends(true);
  }

  return (
    <FriendListStyle>
      <FriendTitle>Freunde:</FriendTitle>

      <StyledUl>
        {friends &&
          friendData.map((friend, index) => (
            <StyledListItem key={index}>
              <p>{friend.nickname}</p>
              <Image src={friend.avatar} alt="Avatar" width={50} height={50} />
            </StyledListItem>
          ))}
        {!friends && (
          <StyledButton onClick={() => handleAddFriendsClick()}>Finde Freunde</StyledButton>
        )}
      </StyledUl>
    </FriendListStyle>
  );
}
