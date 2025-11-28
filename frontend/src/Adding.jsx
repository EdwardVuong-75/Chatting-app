import { NavLink } from 'react-router-dom';
import './Css/Navbar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function AddingFriend() {

  const [name, setName] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchName = async () => {
    const token = localStorage.getItem('token');
    if(token)
    {
      try {
        const res = await axios.get("http://localhost:5000/api/user/SearchFriend",{
        headers: {
        'x-auth-token': token
       }
      });
        setName(res.data);
      }catch(err) 
       {
    console.log(err);
      }
    }
   
  };
   fetchName();
  }, []);


  const searchUser = name.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );


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
     <input
        type="text"
        placeholder="Search friends..."
        className="Searchbar"
        value = {search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>{searchUser.length} user/users</p>

      {searchUser.length === 0 ? (
        <p>No other users found.</p>
      ) : (
        <p>
          {searchUser.map(u => (
            <p className='userCard' key={u._id}>{u.name} ({u.email})
            <button className='adding-butt'
            onClick={() => console.log('f')}
            >Add</button>
            </p>
          ))}
        </p>)}
    </div>
  );
}

export default AddingFriend;
