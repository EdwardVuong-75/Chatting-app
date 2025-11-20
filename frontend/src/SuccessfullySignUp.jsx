import './Login.css';
import {Link} from 'react-router-dom'

function SsignUp() {
 return (
    <div className='App'>
        <h1>You have successfully created an account
</h1>
        <Link to="/">Go to Login page</Link>
    </div>
 );
}

export default SsignUp;