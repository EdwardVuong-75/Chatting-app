import { NavLink } from 'react-router-dom';
import './Css/Navbar.css';
import axios from 'axios';

function LandingPage() {

  const getName = (e) => {
     e.preventDefault()

    axios.get("http://localhost:5000/api/user/:id/LandingPage")
        .then(result => {
          console.log(result);
          localStorage.setItem("token", result.data.token);
        })
        .catch(err =>  {
    
      });
  }

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
    <p>Welcome {getName}</p>
    </div>
  );
}

export default LandingPage;
