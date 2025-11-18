import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// we’re installing Bootstrap for styling,
//  Axios for making HTTP requests,
//  and react-router-dom for handling client-side routing.

function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  
  return (
    <div className="App">
      <h1>Welcome</h1>
      <div>
        <input type='text' id = 'myinput' placeholder = "Enter your Email "></input>
        <br/>
        <input type='text' id = 'myinput2' placeholder = "Enter your password "></input>
        <br/>
        <button type = 'submit' className = 'sbmt' onClick={() => console.log('ff')}>Sign in</button>
        <br/>or<br/>
        <button>Create Account</button>
      </div>
    </div>
  );
}

export default Login;
