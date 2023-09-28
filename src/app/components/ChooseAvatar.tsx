import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

const StyledImage = styled(Image)`
border: 3px black solid;
border-radius: 12px;

`
const StyledButton = styled.button`
display:flex;
background-color: #4CAF50;
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
z-index:1;
`

export default function ChooseAvatar({ avatar, setAvatar, handleChangeAvatar }: { handleChangeAvatar: any, avatar: string; setAvatar: any }): JSX.Element {
  // Array of avatar image file names
  const avatarImages = Array.from({ length: 51 }, (_, i) => `/assets/avartar${i}.jpg`);

  // Shuffle the avatarImages array on component mount
  useEffect(() => {
    const shuffledAvatars = shuffleArray(avatarImages);
    setShuffledAvatarImages(shuffledAvatars);
  }, []);

  const [currentAvatarIndex, setCurrentAvatarIndex] = useState<number>(0);
  const [shuffledAvatarImages, setShuffledAvatarImages] = useState<string[]>(avatarImages);

  // Function to shuffle an array using Fisher-Yates shuffle algorithm
  function shuffleArray(array: string[]) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Function to handle moving to the previous avatar
  const handlePreviousAvatar = () => {
    const previousIndex = (currentAvatarIndex - 1 + shuffledAvatarImages.length) % shuffledAvatarImages.length;
    setCurrentAvatarIndex(previousIndex);
    
  };

  // Function to handle moving to the next avatar
  const handleNextAvatar = () => {
    const nextIndex = (currentAvatarIndex + 1) % shuffledAvatarImages.length;
    setCurrentAvatarIndex(nextIndex);
    
  };

function handleChooseAvatar() {
  setAvatar(shuffledAvatarImages[currentAvatarIndex]);
  handleChangeAvatar(false)
}

  return (
    <>
      <div>
        <StyledButton onClick={handlePreviousAvatar}>&lt;--</StyledButton>
        <StyledImage width={200} height={200} src={shuffledAvatarImages[currentAvatarIndex]} onClick={()=>handleChooseAvatar()} alt="Avatar" />
        <StyledButton onClick={handleNextAvatar}>--&gt;</StyledButton>
      </div>
    </>
  );
}
