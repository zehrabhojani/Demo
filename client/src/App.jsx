import { useState } from 'react'
import './App.css'
import'bootstrap/dist/css/bootstrap.min.css'
import{BrowserRouter, Routes,Route} from 'react-router-dom';
import Registration from './components/registration';
function App() {


  return (
    
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />} />
          
        </Routes>
      </BrowserRouter>

    </div>
    
  )
}

export default App
