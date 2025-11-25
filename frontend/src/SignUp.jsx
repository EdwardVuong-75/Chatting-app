import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import './Css/Login.css';

function SignUp() {
    const [name, setName] =  useState('')
    const [email, setEmail] = useState('')
    const [password, setPassWord] = useState('')
    const [msg, setMsg]= useState()

    const navigate = useNavigate()

    const handeSubmit = (e) => {
      e.preventDefault() //Reload page automatically
      console.log("f")
      if(!name || !email || !password)
      {
        setMsg("Fill in the missing box");
        return;
      }
      else if(!email.includes("@gmail.com") )
      {
        setMsg("Fill in a valid email")
        return;
      }
      else if(password.length !== 8 )
      {
        setMsg("Password must have at least 8 characters")
        return;
      }
        axios.post("http://localhost:5000/api/user/SignUp", { name, email, password })
        .then(result => {
          console.log(result);
        navigate("/SuccessfullySignUp");
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
        {msg && <p className='msg'>{msg}</p>}
        <br/>
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
