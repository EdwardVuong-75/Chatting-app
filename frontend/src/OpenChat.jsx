import { NavLink, useParams } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";

function OpenChat()
{   
    const { id } = useParams();
    const [text, setText] = useState('');
    const [friend, setFriend] = useState(null);

    useEffect(() => {
      const fetchFriendName = async() => {
          const token = localStorage.getItem('token');
          const res = await axios.get(`http://localhost:5000/api/user/GetFrName/${id}`,
            {
              headers: {'x-auth-token' : token}
            }
          )

          setFriend(res.data)
          
      
      }; fetchFriendName();
    }, [id]);


    const sendMes = async() => {
      try {
        const token = localStorage.getItem('token');
        await axios.post("http://localhost:5000/api/user/sendMessage",
          {receiverId: id,
            message: text
          },
          {
            headers: {'x-auth-token':token}
          }
        )
        setText("")
        console.log('sent');

      } catch (err) {
        console.log(err);
      }
    }

    return(
        <div className="chat-container">
             <header className="navbar-container">
      <nav aria-label="Global">
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/Chat"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Chat
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/Adding"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Adding friend
            </NavLink>
          </li>

           <li>
            <NavLink 
              to="/Notification"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Notification
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/profile"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Sign Out
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
             <div className="chat-content">
                <p className="Fl">You are talking to {friend?.name || "Loading..."}</p>
            </div>

            <div className="chat-input-container">
                <input className="Chat-input" placeholder="Type here"
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <button className="send-button" onClick={sendMes}
                >Send</button>
            </div>
        </div>
    );

};

export default OpenChat;