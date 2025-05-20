import { useState } from "react"
import axios from "axios"






function App() {

  //hook useState per cambiare la valuta dell'input
  const [inpValue, setInpValue] = useState("")

  //assegno a una variabile l'endpoint che si aggiorna in base al valore dell'input
  const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=f8ab9584bebbbf818e62d87d46593a6b&query=${inpValue}`
  console.log(endpoint, inpValue)

  //lanciare l'api tramite il button Search 
  axios.get(endpoint).then((res) => console.log(res.data.results))

  return (
    <>
      <header>
        <h1>React BoolFlix</h1>
      </header>
      <main>

        <div className="container search-bar">
          {/* input to search */}
          <input type="text"
            value={inpValue}
            onChange={(e) => (setInpValue(e.target.value), console.log(e.target.value))} />
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
