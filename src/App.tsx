import { useEffect, useState } from 'react'

export const App = () => {
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')
  const [audio, setAudio] = useState('')
  const [data, setData] = useState<string>('')

  useEffect(() => {
    const fetchResources = async () => {
      const imagePath = await window.electron.getResource('images/cover.jpg')
      const videoPath = await window.electron.getResource('videos/4x4.mp4')
      const audioPath = await window.electron.getResource('audios/Sensei.mp3')
      setImage(imagePath)
      setVideo(videoPath)
      setAudio(audioPath)
    }
    fetchResources()

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
      <img src={image} alt="4x4.jpg" />
      <video src={video} controls />
      <audio src={audio} controls />
      <div>
        <h1>Electron Store Example</h1>
        <p>Stored Data: {data}</p>
        <button onClick={saveData}>Save Data</button>
      </div>
    </div>
  )
}

export default App
