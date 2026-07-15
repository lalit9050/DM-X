import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SiqnIn from './pages/SiqnIn'
import SiqnUp from './pages/SiqnUp'

function App() {
  return (
    <Routes>
      <Route path='/siqnin' element={<SiqnIn/>} />
      <Route path='/siqnup' element={<SiqnUp/>}/>
    </Routes>
  )
}

export default App