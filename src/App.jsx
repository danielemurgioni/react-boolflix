function App() {

  return (
    <>
      <header>
        <h1>React BoolFlix</h1>
      </header>
      <main>
        <div className="container search-bar">
          <input type="text" />
          <button>Search</button>
        </div>
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
