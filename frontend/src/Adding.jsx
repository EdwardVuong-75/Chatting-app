import { NavLink } from 'react-router-dom';
import './Css/Navbar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function AddingFriend() {

  const [name, setName] = useState([]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');
  const [add, setAdd] = useState('');

  //displaying people in adding friend page
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

  //Search friends
  const searchUser = name.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  //Send friend request
  const handleSubmit = async(receiverId) => {
    try {
    const token = localStorage.getItem('token');
    const res = await axios.post("http://localhost:5000/api/user/AddingFriend",
      {receiverId},
      {
        headers: {
        'x-auth-token': token
       }
      })

      setAdd(prev => [...prev, receiverId])

       console.log("sent")
        setMsg(res.data.message);
      }
      
        catch(err)  {
    if (err.response.data.error) {
      setMsg(err.response.data.error);   // show backend error message
    } else {
      setMsg("Something went wrong");
    }
      };
  }


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
      <p>{msg}</p>

      {searchUser.length === 0 ? (
        <p>No other users found.</p>
      ) : (
        <div>
          {searchUser.map(u => (
            <p className='userCard' key={u._id}>{u.name} ({u.email})
            <button className='adding-butt'
            onClick={() => handleSubmit(u._id)}
            disabled = {add.includes(u._id)}
            >{add.includes(u._id) ? 'Request sent' : 'Add'}</button>
            </p>
          ))}
        </div>)}
    </div>
  );
}

export default AddingFriend;
