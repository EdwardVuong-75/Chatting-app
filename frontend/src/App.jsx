import { Routes, Route} from 'react-router-dom'

import Login from './Login'
import SignUp from './SignUp'
import SsignUp from './SuccessfullySignUp'
import LandingPage from './LandingPage'
import Profile from './Profile'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path= '/SuccessfullySignUp' element={<SsignUp/>}/>
        <Route path= '/LandingPage' element={<LandingPage/>}/>
        <Route path= '/Profile' element={<Profile/>}/>
      </Routes>
  )
}

export default App