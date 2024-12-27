import { useState } from 'react'
import { initTokenManager } from './utils/tokenManager'


function App() {
  useEffect(() => {
    initTokenManager()
  }, [])


  return (
    <>

    </>
  )
}

export default App
