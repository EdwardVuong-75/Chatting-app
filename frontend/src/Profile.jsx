import { NavLink, Link } from 'react-router-dom';
import './Css/Navbar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Profile() {

  const [name, setName] = useState('');
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    const fetchName = async () => {
    const token = localStorage.getItem('token');
    if(token)
    {
      try {
        const res = await axios.get("http://localhost:5000/api/user/Username",{
        headers: {
        'x-auth-token': token
       }
      });

       const getFriend = await axios.get("http://localhost:5000/api/user/GetFr",{
        headers: {
        'x-auth-token': token
       }
      });

        setName(res.data.name);
        setFriend(getFriend.data)
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
    <img className='profile-pic' src = {'./public/profile-pic.jpg'}/>
    <div className='Username'>{name}</div>
    <p className='Fl'>Your friends: {friend.length}</p>
    <div>{friend.length === 0 ? (<div>You have no contact.<br/> 
      <Link to='/Adding'>Let's connect</Link></div>) :
     (<div>{friend.map(u => (
      <p className='userCard' key={u._id}>{u.name} ({u.email})</p>
      
     ))}</div>)}</div>
    </div>
  );
}

export default Profile;
