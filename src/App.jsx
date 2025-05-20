import { useEffect, useState } from "react"
import axios from "axios"






function App() {

  //hook useState --> cambia la valuta dell'input
  const [inpValue, setInpValue] = useState("")

  //hook useState --> aggiorna la valuta dell'endpoint tramite il button search onClick
  const [queryValue, setQueryValue] = useState(inpValue)


  //hook useState --> contiene l'array che viene aggiornato tramite useEffect
  const [arrMovies, setArrMovies] = useState([])

  //hook useEffect --> esegue il codice ogni volta che l'endpoint viene aggiornato
  useEffect(() => {
    //assegno a una variabile l'endpoint che si aggiorna in base al valore dell'input tramite il button search
    const endpointMovies = `https://api.themoviedb.org/3/search/movie?api_key=f8ab9584bebbbf818e62d87d46593a6b&query=${queryValue}`
    console.log(endpointMovies)
    //chiamo l'endpoint tramite axios e salvo i dati nella variabile di stato arrMovies tramite useState
    axios.get(endpointMovies).then((res) => setArrMovies(res.data.results))
  }, [queryValue])
  console.log(arrMovies)

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
            onChange={(e) => (setInpValue(e.target.value))} />
          {/* button activate search */}
          <button className="btn-search" onClick={() => setQueryValue(inpValue)}>Search</button>
        </div>

        {/* card */}
        <div className="container movie-data mt-40">
          {arrMovies.map((movie) => (
            <div key={movie.id} className="movie-info m-20" >
              <p><strong>titolo film -</strong> {movie.title}</p>
              <p><strong>titolo originale del film -</strong> {movie.original_title}</p>
              <p><strong>Lingua -</strong> {movie.original_language}</p>
              <p><strong>Voto -</strong> {movie.vote_average}</p>
            </div>
          ))}
        </div>

      </main >
    </>
  )
}

export default App
