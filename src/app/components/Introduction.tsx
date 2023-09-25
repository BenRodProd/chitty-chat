import saveToDatabase from '@/service/writeUserInfo';

export default function Introduction({userEmail, userName, setNickName} : {userEmail: string, userName: string, setNickName: any}): JSX.Element {
  
    function handleNewNickName(e: any, userEmail: string, userName: string) {
        e.preventDefault();
      
        setNickName(e.target.nickname.value)
        saveToDatabase(userEmail, "nick", e.target.nickname.value)
    }
    return (
        <div>
            <h1>Welcome to ChittyChat</h1>
            <h2>Hallo {userName}, please choose a Nickname:</h2>
            <form onSubmit={(e)=> handleNewNickName(e, userEmail, userName)}>
                <input type="text" placeholder="Nickname" name="nickname"/>
                <button type="submit">OK</button>
            </form>
        </div>
    );
}