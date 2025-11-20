import { Routes, Route} from 'react-router-dom'

import Login from './Login'
import SignUp from './SignUp'
import SsignUp from './SuccessfullySignUp'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path= '/SuccessfullySignUp' element={<SsignUp/>}/>
      </Routes>
  )
}

export default App