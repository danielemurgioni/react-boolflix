import { useState } from "react"
import axios from "axios"






function App() {

  //hook useState per cambiare la valuta dell'input
  const [inpValue, setInpValue] = useState("")

  //hook useState per aggiornare la valuta dell'endpoint tramite il button onClick
  const [queryValue, setQueryValue] = useState(inpValue)

  //assegno a una variabile l'endpoint che si aggiorna in base al valore dell'input tramite un button
  const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=f8ab9584bebbbf818e62d87d46593a6b&query=${queryValue}`
  console.log(endpoint, inpValue, queryValue)

  //chiamo l'endpoint tramite axios e verifico il contenuto con un console log
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
          <button onClick={setQueryValue}>Search</button>
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
