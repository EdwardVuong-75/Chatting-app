import { NavLink } from 'react-router-dom';
import './Css/Navbar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function LandingPage() {

  const [name, setName] = useState('');

  useEffect(() => {
    const fetchName = async () => {
    const token = localStorage.getItem('token');
    if(token)
    {
      try {
        const res = await axios.get("http://localhost:5000/api/user/LandingPage",{
        headers: {
        'x-auth-token': token
       }
      });
        setName(res.data.name);
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
              to="/about"
              className={({ isActive }) => isActive ? "active" : ""}
            >
              Chat
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
    <p>Welcome {name}. Lets connect</p>
    </div>
  );
}

export default LandingPage;
