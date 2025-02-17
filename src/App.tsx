import { useEffect, useState } from 'react'
import './App.css'

export const App = () => {
  const [video4x4, setVideo4x4] = useState('')
  const [data, setData] = useState<string>('')
  useEffect(() => {
    const fetchVideo = async () => {
      const path = await window.electron.getResource('videos/4x4.mp4')
      setVideo4x4(path)
    }
    fetchVideo()

    window.electron.getData().then((storedData) => {
      setData(storedData)
    })
  }, [])
  const saveData = () => {
    const newData = 'Hello, Electron Store!'
    window.electron.setData(newData).then((response) => {
      console.log(response)
      setData(newData)
    })
  }
  return (
    <div>
      <h1>TEST-ELECTRON-VITE-REACT</h1>
      {video4x4 && <video controls src={video4x4} />}
      <div>
        <h1>Electron Store Example</h1>
        <p>Stored Data: {data}</p>
        <button onClick={saveData}>Save Data</button>
      </div>
    </div>
  )
}

export default App
