import { useEffect, useState } from 'react'
import './App.css'

export const App = () => {
  const [video4x4, setVideo4x4] = useState('')

  useEffect(() => {
    const fetchVideo = async () => {
      const path = await window.electron.getResource('videos/4x4.mp4')
      setVideo4x4(path)
    }
    fetchVideo()
  }, [])

  return (
    <div>
      <h1>TEST-ELECTRON-VITE-REACT</h1>
      {video4x4 && <video controls src={video4x4} />}
    </div>
  )
}

export default App
