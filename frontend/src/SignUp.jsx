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
      console.log("f")
        e.preventDefault()
        axios.post("http://localhost:5000/api/user/SignUp", { name, email, password })
        .then(result => {console.log(result)
        navigate("/")
        })
        .catch(err => console.log(err))
    }

  
  return (
    <div className='App'>
     <h1>Sign Up</h1>

     <form onSubmit={handeSubmit}>
     <label>Enter your name</label><br/>
     <input type='text' placeholder = "Enter your name "
     onChange={(e) => setName(e.target.value)} 
     >

     </input>
        <br/><br/>
        <label>Enter your email</label><br/>
        <input type='text' placeholder = "Enter your email "
        onChange={(e) => setEmail(e.target.value)}></input>
        <br/><br/>

        <label>Enter your password</label><br/>
        <input type='text' placeholder = "Enter your password "
        onChange={(e) => setPassWord(e.target.value)}></input>
        <br/><br/>

        <button type = 'submit' className = 'sbmt2'>Submit</button>
        </form>
         <br/><br/>
         <Link to = "/">
         Go back to Sign in
         </Link>
    </div>
  );
}

export default SignUp;
