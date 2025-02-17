export {}

declare global {
  interface Window {
    electron: {
      getResource: (
        fileName: `videos/${string}` | `images/${string}` | `audios/${string}`
      ) => Promise<string>
    }
  }
}
