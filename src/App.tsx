import './App.css'

const PAIRS = [
  { bettor: "Alice Y", cardinal: "Pierbattista Pizzaballa" },
  { bettor: "Amy S", cardinal: "Jean-Marc Aveline" },
  { bettor: "Anna R", cardinal: "Mario Grech" },
  { bettor: "Ellie R", cardinal: "Robert Sarah" },
  { bettor: "Gabriel M", cardinal: "Pietro Parolin" },
  { bettor: "Izzy H", cardinal: "Luis Antonio Tagle" },
  { bettor: "Jay C", cardinal: "Wilton Daniel Gregory" },
  { bettor: "Kate P", cardinal: "Peter Erdo" },
  { bettor: "Ollie G", cardinal: "Fridolin Ambongo Besungu" },
  { bettor: "Rose D", cardinal: "Peter Turkson" },
  { bettor: "Eleanor W", cardinal: "Matteo Zuppi" },
  { bettor: "Isobel T", cardinal: "Fernando Filoni" },
  { bettor: "Jane Y", cardinal: "Anders Arborelius" }
]

function App() {
  return (
    <div className="app">
      <h1>Cardinal Pairing Generator</h1>

      <div className="pairs-list">
        <h2>Generated Pairs:</h2>
        <div className="pairs-grid">
          {PAIRS.map((pair, index) => (
            <div key={index} className="pair-card">
              <div className="bettor-name">{pair.bettor}</div>
              <div className="cardinal-name">→ {pair.cardinal}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
