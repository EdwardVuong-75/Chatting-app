import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Css/Navbar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Chat() {

  const [friend, setFriend] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchName = async () => {
    const token = localStorage.getItem('token');
    if(token)
    {
      try {
        const res = await axios.get("http://localhost:5000/api/user/GetFr",{
        headers: {
        'x-auth-token': token
       }
      });
        setFriend(res.data);
      }catch(err) 
       {
    console.log(err);
      }
    }
   
  };
   fetchName();
  }, []);



  return (
    <div>
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
    <p>Your chat: {friend.length}</p>
    <div>{friend.length === 0 ? (<p>No friend yet. <Link to="/Adding">Let's connect</Link></p>)
     : (
      <p>{friend.map(u => 
        <button className='userCard'  key={u._id} onClick={() => navigate(`/OpenChat/${u.name}`)}>
          {u.name} ({u.email})
        </button>
      )}</p>
     )}

    </div>
    </div>
  );
}

export default Chat;
