import { useState } from 'react'

function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <button onClick={() => setCount(count => count + 1)}>Click me</button>
      <p>Count: {count}</p>
    </>
  )
}

export default App
