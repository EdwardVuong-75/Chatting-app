import { Routes, Route} from 'react-router-dom'

import Login from './Login'
import SignUp from './SignUp'
import SsignUp from './SuccessfullySignUp'
import LandingPage from './LandingPage'
import Profile from './Profile'
import AddingFriend from './Adding'
import Chat from './Chat'
import Notification from './Notification'
import OpenChat from './OpenChat'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path= '/SuccessfullySignUp' element={<SsignUp/>}/>
        <Route path= '/LandingPage' element={<LandingPage/>}/>
        <Route path= '/Profile' element={<Profile/>}/>
        <Route path= '/Adding' element={<AddingFriend/>}/>
        <Route path= '/Chat' element={<Chat/>}/>
        <Route path= '/Notification' element={<Notification/>}/>
        <Route path= '/OpenChat/:id' element={<OpenChat/>}/>
      </Routes>
  )
}

export default App