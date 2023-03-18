import { useEffect, useState, useRef } from 'react'
import DrumMachine from './components/DrumMachine';
import DrumPad from './components/DrumPad';
import DrumEngine from './DrumEngine';
import { kits } from './kits';


function App() {
  const [blinkTrigger, setBlinkTrigger] = useState(0);

  return (
    <div className="App w-3/4 mx-auto py-8">

      <DrumMachine />
    </div>
  )
}

export default App
