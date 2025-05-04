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

// Top 13 cardinals based on the provided list
const TOP_CARDINALS = [
  "Pietro Parolin",
  "Luis Antonio Tagle",
  "Peter Turkson",
  "Matteo Zuppi",
  "Pierbattista Pizzaballa",
  "Peter Erdo",
  "Robert Sarah",
  "Wilton Daniel Gregory",
  "Mario Grech",
  "Jean-Marc Aveline",
  "Fridolin Ambongo Besungu",
  "Fernando Filoni",
  "Anders Arborelius"
]

// Helper function to safely access localStorage
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      return null
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error('Error setting localStorage:', error)
    }
  }
}

function App() {
  const [pairs, setPairs] = useState<{ bettor: string; cardinal: string }[]>(() => {
    try {
      const savedPairs = safeLocalStorage.getItem('cardinalPairs')
      return savedPairs ? JSON.parse(savedPairs) : []
    } catch (error) {
      console.error('Error parsing saved pairs:', error)
      return []
    }
  })
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [hasGenerated, setHasGenerated] = useState(() => {
    const lastGenerated = safeLocalStorage.getItem('lastGeneratedDate')
    return lastGenerated === '2025-05-05'
  })
  const [error, setError] = useState<string | null>(null)

  const generatePairs = () => {
    if (hasGenerated) return // Don't generate if we already have pairs

    try {
      // Create a copy of top cardinals and shuffle them
      const shuffledCardinals = [...TOP_CARDINALS]
        .sort(() => Math.random() - 0.5)

      // Create pairs ensuring each cardinal is used only once
      const newPairs = BETTORS.map((bettor, index) => ({
        bettor,
        cardinal: shuffledCardinals[index]
      }))

      // Save pairs to localStorage
      safeLocalStorage.setItem('cardinalPairs', JSON.stringify(newPairs))
      safeLocalStorage.setItem('lastGeneratedDate', '2025-05-05')

      setPairs(newPairs)
      setHasGenerated(true)
      setError(null)
    } catch (error) {
      console.error('Error generating pairs:', error)
      setError('Failed to generate pairs. Please try refreshing the page.')
    }
  }

  useEffect(() => {
    const updateTimer = () => {
      try {
        const now = new Date()
        const targetTime = new Date('2025-05-05T12:00:00+01:00') // 12:00 PM BST on May 5th, 2025

        // If it's past target time, show "Pairs Generated" instead of countdown
        if (now > targetTime) {
          if (!hasGenerated) {
            generatePairs()
          }
          setTimeLeft("Pairs Generated")
          return
        }

        const diff = targetTime.getTime() - now.getTime()
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)

        setTimeLeft(`${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)

        // If it's time to generate pairs and we haven't generated yet
        if (diff <= 0 && !hasGenerated) {
          generatePairs()
        }
      } catch (error) {
        console.error('Error updating timer:', error)
        setError('Error updating timer. Please refresh the page.')
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

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="timer-container">
        <h2>Pairing at 12:00 PM BST on May 5th, 2025</h2>
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
