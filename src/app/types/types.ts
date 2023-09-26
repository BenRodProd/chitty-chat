export interface User {
    uid: string;
    displayName: string | null;
    email: string | null;

  }
  export interface UserData {
    nick: string;
    avatar: string;
    friends: string[];
    rooms: string[];
  }