import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import './Login.css';

function SignUp() {
    const [name, setName] =  useState()
    const [email, setEmail] = useState()
    const [password, setPassWord] = useState()

    const navigate = useNavigate()

    const handeSubmit = (e) => {
        e.preventDefaut()
        axios.post("http://localhost:5000/SignUp", { name, email, password })
        .then(result => {console.log(result)
        navigate("/")
        })
        .catch(err => console.log(err))
    }

  
  return (
    <div className='App'>
     <h1>Sign Up</h1>
     <label>Enter your name</label><br/>
     <input type='text' placeholder = "Enter your name "></input>
        <br/><br/>
        <label>Enter your email</label><br/>
        <input type='text' placeholder = "Enter your email "></input>
        <br/><br/>

        <label>Enter your password</label><br/>
        <input type='text' placeholder = "Enter your password "></input>
        <br/><br/>

        <button type = 'submit' className = 'sbmt2'
         onClick={() => handeSubmit}>Submit</button>
         <br/><br/>
         <Link to = "/">
         Go back to Sign in
         </Link>
    </div>
  );
}

export default SignUp;
