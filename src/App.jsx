import { useState } from 'react'

import './App.css'
import { Input } from './components/input'

function App() {
  const [count, setCount] = useState(0)

  
  return (
    <>
      <Input />
    </>
  )
}

export default App
