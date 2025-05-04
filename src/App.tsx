import { useState, useEffect } from 'react'
import { cardinals } from './data/cardinals'
import './App.css'

const BETTORS = [
  "Alice Y",
  "Amy S",
  "Anna R",
  "Ellie R",
  "Gabriel M",
  "Izzy H",
  "Jay C",
  "Kate P",
  "Ollie G",
  "Rose D",
  "Eleanor W",
  "Isobel T",
  "Jane Y"
]

function App() {
  const [pairs, setPairs] = useState<{ bettor: string; cardinal: string }[]>([])
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [hasGenerated, setHasGenerated] = useState(false)

  const generatePairs = () => {
    if (hasGenerated) return // Don't generate if we already have pairs

    const shuffledCardinals = [...cardinals].sort(() => Math.random() - 0.5)
    const newPairs = BETTORS.map((bettor, index) => ({
      bettor,
      cardinal: shuffledCardinals[index % shuffledCardinals.length].name
    }))
    setPairs(newPairs)
    setHasGenerated(true)
  }

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const londonTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }))
      const targetTime = new Date(londonTime)
      targetTime.setHours(21, 15, 0, 0) // 9:15 PM

      // If it's past 9:15 PM, show "Pairs Generated" instead of countdown
      if (londonTime > targetTime) {
        if (!hasGenerated) {
          generatePairs()
        }
        setTimeLeft("Pairs Generated")
        return
      }

      const diff = targetTime.getTime() - londonTime.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)

      // If it's time to generate pairs and we haven't generated yet
      if (diff <= 0 && !hasGenerated) {
        generatePairs()
      }
    }

    // Update timer immediately and then every second
    updateTimer()
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [hasGenerated])

  return (
    <div className="app">
      <h1>Cardinal Pairing Generator</h1>

      <div className="timer-container">
        <h2>Pairing at 9:15 PM BST Today</h2>
        <div className="timer">{timeLeft}</div>
      </div>

      <div className="bettors-list">
        <h2>Bettors ({BETTORS.length}):</h2>
        <div className="bettors-grid">
          {BETTORS.map((bettor, index) => (
            <div key={index} className="bettor-tag">
              {bettor}
            </div>
          ))}
        </div>
      </div>

      {pairs.length > 0 && (
        <div className="pairs-list">
          <h2>Generated Pairs:</h2>
          <div className="pairs-grid">
            {pairs.map((pair, index) => (
              <div key={index} className="pair-card">
                <div className="bettor-name">{pair.bettor}</div>
                <div className="cardinal-name">→ {pair.cardinal}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
