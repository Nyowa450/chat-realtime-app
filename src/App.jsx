import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { useRef, useState } from 'react';
import { Chat } from './components/Chat';
import {signOut} from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);
  // console.log(isAuth)

  const roomInputRef = useRef(null);

  const singUserOut = async()=>{
    signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label className="room-label">Chatroom-Name</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Try Chat
          </button>
        </div>
      )}

      <div className="sign-out">
        <button onClick={singUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
