import { useEffect, useState } from "react"
import axios from "axios"


function App() {

  //hook useState --> cambia la valuta dell'input
  const [inpValue, setInpValue] = useState("")

  //hook useState --> aggiorna la valuta dell'endpoint tramite il button search onClick
  const [queryValue, setQueryValue] = useState(inpValue)


  //hook useState --> contiene l'array che viene aggiornato tramite useEffect
  const [arrMovies, setArrMovies] = useState([])

  const [arrTVseries, setTVseries] = useState([])

  //hook useEffect --> esegue il codice ogni volta che l'endpoint viene aggiornato
  useEffect(() => {
    //assegno a una variabile l'endpoint che si aggiorna in base al valore dell'input tramite il button search
    const endpointMovies = `https://api.themoviedb.org/3/search/movie?api_key=f8ab9584bebbbf818e62d87d46593a6b&query=${queryValue}`
    console.log(endpointMovies)
    const endpointTVseries = `https://api.themoviedb.org/3/search/tv?api_key=f8ab9584bebbbf818e62d87d46593a6b&query=${queryValue}`
    //chiamo l'endpoint tramite axios e salvo i dati nella variabile di stato arrMovies tramite useState
    axios.get(endpointMovies).then((res) => setArrMovies(res.data.results))
    //effettuo la chiamata ma per le series tv
    axios.get(endpointTVseries).then((res) => setTVseries(res.data.results))
  }, [queryValue])

  //creo una funzione che converte la lingua del film nella bandiera corrispondente
  const languageToFlag = (language) => {
    //array contenente il codice paese invece del codice lingue
    const fixLanguageCode = {
      en: "gb",
      ja: "jp",
      ko: "kr",
      zh: "cn",
      hi: "in",
    }

    if (language) {
      const country = fixLanguageCode[language.toLowerCase()] || language.toLowerCase();
      const url = `https://flagcdn.com/24x18/${country}.png`
      return (
        <img src={url} alt={language} />
      )
    }
    else {
      return (
        <span>Bandiera Sconosciuta</span>
      )
    }
  }

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

        {/* card movies */}
        <div className="container movie-data mt-40">
          <h2>Movies</h2>
          {arrMovies.map((movie) => (
            <div key={movie.id} className="movie-info m-20 border" >
              <p><strong>titolo film -</strong> {movie.title}</p>
              <p><strong>titolo originale del film -</strong> {movie.original_title}</p>
              <p><strong>Lingua -</strong> {languageToFlag(movie.original_language)}</p>
              <p><strong>Voto -</strong> {movie.vote_average}</p>
            </div>
          ))}
        </div>

        {/* card TV Series */}
        <div className="container serie-data mt-40">
          <h2>TV series</h2>
          {arrTVseries.map((serie) => (
            <div key={serie.id} className="serie-info m-20 border" >
              <p><strong>titolo serie tv -</strong> {serie.name}</p>
              <p><strong>titolo originale della serie tv -</strong> {serie.original_name}</p>
              <p><strong>Lingua -</strong> {languageToFlag(serie.original_language)}</p>
              <p><strong>Voto -</strong> {serie.vote_average}</p>
            </div>
          ))}
        </div>

      </main >
    </>
  )
}

export default App
