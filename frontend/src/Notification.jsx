import { NavLink } from 'react-router-dom';
import './Css/Navbar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Notification() {

  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const fetchNotification = async () => {
    const token = localStorage.getItem('token');
    if(token)
    {
      try {
        const res = await axios.get("http://localhost:5000/api/user/GetRequest",{
        headers: {
        'x-auth-token': token
       }
      });
        setNotification(res.data);
      }catch(err) 
       {
    console.log(err);
      }
    }
   
  };
   fetchNotification();
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
    {notification.length === 0 ? (<p>No request</p>) : (
      <div>
        {notification.map(req => (
          <p className='userCard' key={req._id}>{req.sender.name} ({req.sender.email})
          <button className='accept-butt'> Accept
            </button>
            <button className='reject-butt'>Reject 
              </button></p>
        ))}
        </div>)}
    </div>
  );
}

export default Notification;
