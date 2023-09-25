import saveToDatabase from '@/service/writeUserInfo';

export default function Introduction({userEmail, userName, setNickName} : {userEmail: string, userName: string, setNickName: any}): JSX.Element {
  
   async function handleNewNickName(e: any, userEmail: string) {
        e.preventDefault();
      
        await setNickName(e.target.nickname.value)
        await saveToDatabase(userEmail, "nick", e.target.nickname.value)
        saveToDatabase(userEmail, "email", userEmail)

    }
    return (
        <div>
            <h1>Welcome to ChittyChat</h1>
            <h2>Hallo {userName}, please choose a Nickname:</h2>
            <form onSubmit={(e)=> handleNewNickName(e, userEmail)}>
                <input type="text" placeholder="Nickname" name="nickname"/>
                <button type="submit">OK</button>
            </form>
        </div>
    );
}