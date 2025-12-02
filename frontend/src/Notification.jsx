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
   fetchNotification();console.log("loaded a new message");
  }, []);

  const rejectRequest = async(requestId) => {
    const token = localStorage.getItem('token');
    if(token)
    {
      try {
         await axios.delete("http://localhost:5000/api/user/rejectRequest",
          {
            data: {requestId},
            headers: {
              "x-auth-token": token
            }
          }
        );
        setNotification(prev => prev.filter(req => req._id !== requestId));
        console.log('Rejected')

      } catch (err) {
        console.log(err)
      }
    }

  };

  const acceptReq = async(requestId) => {
    const token = localStorage.getItem('token')
    if(token)
    {
      try {
        await axios.post("http://localhost:5000/api/user/AcceptRequest",
            {requestId},
            {
              headers: {'x-auth-token': token}
            }
          
        );
        setNotification((prev) => prev.filter((req) => req._id !== requestId));
        console.log("accepted");
      } catch (error) {

        console.log(error);
      }
    }

  };


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
    <p>You have {notification.length} notifications</p>
    {notification.length === 0 ? (<p>No request</p>) : (
      <div>
        {notification.map(req => (
          <div className='userCard' key={req._id}>{req.sender.name} ({req.sender.email})
          <button className='accept-butt'
          onClick={() => acceptReq(req._id)}
          > Accept
            </button>
            <button className='reject-butt'
            onClick={() => rejectRequest(req._id)}
            >Reject 
              </button></div>
        ))}
        </div>)}
    </div>
  );
}

export default Notification;
