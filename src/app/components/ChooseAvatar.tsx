export default function ChooseAvatar({avatar, setAvatar} : {avatar: string, setAvatar: any}): JSX.Element {
    return (
        <>
        <img src={avatar} alt="Avatar" onClick={() => setAvatar("https://www.pngall.com/wp-content/uploads/5/Avatar-Profile-PNG.png")}/>
        </>
    )
}