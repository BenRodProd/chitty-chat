import Image from 'next/image';

export default function SplashScreen() {
  return (
    <div className="splash">
      <Image src="/kitty_intro.png" alt="kitty" width="400" height="400" />
      <h2 className="splashText">Kitty Chat</h2>
    </div>
  );
}
