import { useNavigate } from 'react-router-dom';
import './Css/Login.css';
import { useState } from 'react';
import axios from 'axios';

// we’re installing Bootstrap for styling,
//  Axios for making HTTP requests,
//  and react-router-dom for handling client-side routing.

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!email || !password)
    {
      setMsg("Fill in missing box");
      return
    }

    axios.post("http://localhost:5000/api/user/Login", { email, password })
        .then(result => {
          console.log(result);
          localStorage.setItem("token", result.data.token);

        navigate("/LandingPage");
        })
        .catch(err =>  {
    if (err.response.data.error) {
      setMsg(err.response.data.error);   // show backend error message
    } else {
      setMsg("Something went wrong");
    }
      });
  }
  
  
  return (
    <div className="App">
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' id = 'myinput' placeholder = "Enter your Email " 
        onChange={(e) => setEmail(e.target.value)}></input>
        <br/><br/>
        <input type='password' id = 'myinput2' placeholder = "Enter your password "
        onChange={(e) => setPassword(e.target.value)}></input>
        <br/>
        {msg && <p className='msg'>{msg}</p>}
        <br/>
        <button type = 'submit' className = 'sbmt' onClick={() => console.log('ff')}>Sign in</button>
        </form>
        <br/>or<br/><br/>
        <button onClick={()=> navigate("/SignUp")}>
          Create Account</button>
    </div>
  );
}

export default Login;
