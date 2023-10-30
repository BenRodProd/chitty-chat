'use client';
import { User } from '../types/types';
import getUserInfos from '@/service/getUserInfo';
import { useEffect, useState } from 'react';
import Introduction from './Introduction';
import FriendList from './FriendList';
import RoomList from './RoomList';
import { Settings } from './Settings';
import writeToFirestore from '@/service/writeUserInfo';
import ChooseAvatar from './ChooseAvatar';
import ShowRoom from './ShowRoom';
import Image from 'next/image';
import styled from 'styled-components';
import SplashScreen from './SplashScreen';

const ProfileSection = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  align-self: flex-end;
  background-color: aliceblue;

  text-align: center;
  z-index: 1;
`;

const SettingsButton = styled.button`
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #4caf4fe6;
  border: none;
  color: white;
  padding: 8px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  z-index: 14;
`;
const ProfileLists = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background-color: lightblue;
  border: 3px black solid;
  border-radius: 12px;
  user-select: none;
  min-height: 100px;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
`;

const AvatarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-self: flex-end;
  background-color: lightblue;
`;

export default function Main({ user }: { user: User }): JSX.Element {
  const [userNick, setUserNick] = useState<string>();
  const [userFriends, setUserFriends] = useState<string[]>([]);
  const [userRooms, setUserRooms] = useState<string[]>([]);
  const [settings, setSettings] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [activeRoom, setActiveRoom] = useState<string>();
  const [addRoom, setAddRoom] = useState(false);
  const [addFriend, setAddFriend] = useState(false);
  const [splashScreenActive, setSplashScreenActive] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashScreenActive(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (userFriends && user.email) {
      writeToFirestore(user.email, 'friends', userFriends);
    }
  }, [userFriends, user.email]);

  useEffect(() => {
    if (userRooms && user.email) {
      writeToFirestore(user.email, 'rooms', userRooms);
    }
  }, [userRooms, user.email]);

  useEffect(() => {
    if (userAvatar && user.email) {
      writeToFirestore(user.email, 'avatar', userAvatar);
    }
  }, [userAvatar, user.email]);

  useEffect(() => {
    if (user.email) {
      getUserInfos(user.email).then((data) => {
        if (data && data.nick) {
          setUserNick(data.nick);
        }
        if (data && data.friends) {
          setUserFriends(data.friends);
        }
        if (data && data.avatar) {
          setUserAvatar(data.avatar);
        }
        if (data && data.rooms) {
          setUserRooms(data.rooms);
        }
        if (data && data.activeRoom) {
          setActiveRoom(data.activeRoom);
        }
      });
    }
  }, [user]);

  if (!userNick && user.email && user.displayName && !splashScreenActive)
    return (
      <Introduction userEmail={user.email} userName={user.displayName} setNickName={setUserNick} />
    );
  if (!userAvatar && !splashScreenActive)
    return (
      <AvatarDiv>
        <ChooseAvatar avatar={userAvatar} setAvatar={setUserAvatar} />
      </AvatarDiv>
    );

  return (
    <MainDiv>
      {splashScreenActive && <SplashScreen />}
      <SettingsButton type="button" onClick={() => setSettings((prev) => !prev)}>
        <Image src="/settings.png" alt="settings" width={20} height={20} />
      </SettingsButton>
      {settings && (
        <Settings
          setActiveRoom={setActiveRoom}
          setAddFriend={setAddFriend}
          addFriend={addFriend}
          addRoom={addRoom}
          setAddRoom={setAddRoom}
          setSettings={setSettings}
          avatar={userAvatar}
          setAvatar={setUserAvatar}
          friends={userFriends}
          rooms={userRooms}
          user={user}
          setRooms={setUserRooms}
          setFriends={setUserFriends}
        />
      )}
      <ProfileSection>
        <ProfileLists>
          <FriendList
            friends={userFriends}
            setSettings={setSettings}
            setAddFriends={setAddFriend}
          />
          <RoomList
            user={user}
            setSettings={setSettings}
            setAddRoom={setAddRoom}
            rooms={userRooms}
            setActiveRoom={setActiveRoom}
          />
        </ProfileLists>
      </ProfileSection>
      {activeRoom && userNick && (
        <ShowRoom userNick={userNick} userAvatar={userAvatar} user={user} activeRoom={activeRoom} />
      )}
    </MainDiv>
  );
}
