import { Routes, Route} from 'react-router-dom'

import Login from './Login'
import SignUp from './SignUp'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
      </Routes>
  )
}

export default App