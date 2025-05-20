import { useState } from "react"

function App() {

  const [search, setSearch] = useState("")

  return (
    <>
      <header>
        <h1>React BoolFlix</h1>
      </header>
      <main>

        <div className="container search-bar">
          {/* input to search */}
          <input type="text"
            value={search}
            onChange={(e) => (setSearch(e.target.value), console.log(e.target.value))} />
          {/* button activate search */}
          <button>Search</button>
        </div>

        {/* card */}
        <div className="container film-data mt-40">
          <h2>titolo film</h2>
          <h2>titolo originale del film</h2>
          <h2>Lingua</h2>
          <h2>Voto</h2>
        </div>

      </main>
    </>
  )
}

export default App
