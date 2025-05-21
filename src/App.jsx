import { useEffect, useState } from "react"
import axios from "axios"

/*Fontawensome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" //componente
import { faStar as fullstar } from "@fortawesome/free-solid-svg-icons" //icona Stella piena (rinominato con "as" per differenziare due icone uguali ma con stili diversi  )
import { faStar as emptystar } from "@fortawesome/free-regular-svg-icons" //icona Stella vuota

function App() {

  //hook useState --> cambia la valuta dell'input
  const [inpValue, setInpValue] = useState("")

  //hook useState --> aggiorna la valuta dell'endpoint tramite il button search onClick
  const [queryValue, setQueryValue] = useState(inpValue)


  //hook useState --> contiene l'array che viene aggiornato tramite useEffect
  const [arrMovies, setArrMovies] = useState([])

  const [arrTVseries, setArrTVseries] = useState([])

  //assegno a una variabile l'endpoint che si aggiorna in base al valore dell'input tramite il button search
  const endpointMovies = `https://api.themoviedb.org/3/search/movie?api_key=f8ab9584bebbbf818e62d87d46593a6b&query=${queryValue}`
  const endpointTVseries = `https://api.themoviedb.org/3/search/tv?api_key=f8ab9584bebbbf818e62d87d46593a6b&query=${queryValue}`

  //ottimizato la chiamata delle'endpoint
  const getShow = (endpoint, setState) => {
    //chiamo l'endpoint tramite axios e salvo i dati nella variabile di stato arrMovies tramite useState
    axios.get(endpoint).then((res) => setState(res.data.results))
    console.log(endpoint)
  }

  //hook useEffect --> esegue il codice ogni volta che l'endpoint viene aggiornato
  useEffect(() => {
    getShow(endpointMovies, setArrMovies)
    getShow(endpointTVseries, setArrTVseries)
  }, [queryValue])

  const handleSearch = () => {
    setQueryValue(inpValue)
  }

  //creo una funzione che converte la lingua del film nella bandiera corrispondente
  const languageToFlag = (language) => {
    //array contenente il codice paese invece del codice lingue
    const fixLanguageCode = { en: "gb", ja: "jp", ko: "kr", zh: "cn", hi: "in" }

    if (language) {
      const country = fixLanguageCode[language.toLowerCase()] || language.toLowerCase();
      const url = `https://flagcdn.com/24x18/${country}.png`
      return <img src={url} alt={language} />
    }
    return <span>Bandiera Sconosciuta</span>
  }

  //converto il voto da 10 a 1 con Math.ceil ad 5 a 1 
  const convertVote = (number) => {
    //"ceil" arrotonda sempre per eccesso
    return Math.ceil(number / 2)
  }

  //poi transformo il voto in stelle
  const voteToStars = (vote) => {

    const maxVote = 5
    const fullStars = vote
    // il numero di stelle piene viene sottratto al voto massimo cosi facendo le restanti stelle saranno vuote, quindi se il risultato sara 0 non verrano renderizate stelle vuote
    const emptyStars = maxVote - fullStars

    return ( //renderizzo
      <div className="star-rating">
        {/* uso il constructor Array(n), creo un array con lunghezza uguale al valore dato nelle parantesi e lo clono con lo spread operator */}
        {[...Array(fullStars)].map((item, index) => (
          <FontAwesomeIcon key={`full-star-${index}`} icon={fullstar} className="full-star" />
        ))}
        {[...Array(emptyStars)].map((item, index) => (
          <FontAwesomeIcon key={`empty-star-${index}`} icon={emptystar} className="empty-star" />
        ))}
      </div>
    )
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
          <button className="btn-search" onClick={handleSearch}>Search</button>
        </div>

        {/* card movies */}
        <div className="container movie-data mt-40">
          <h2>Movies</h2>
          {arrMovies.map((movie) => (
            <div key={movie.id} className="movie-info m-20 border" >
              <p><strong>titolo film -</strong> {movie.title}</p>
              <p><strong>titolo originale del film -</strong> {movie.original_title}</p>
              <p><strong>Lingua -</strong> {languageToFlag(movie.original_language)}</p>
              <div className="vote"><strong>Voto -</strong> {voteToStars(convertVote(movie.vote_average))}</div>
              <img src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt={movie.title} />
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
              <div className="vote"><strong>Voto -</strong> {voteToStars(convertVote(serie.vote_average))}</div>
              <img src={`http://image.tmdb.org/t/p/w342/${serie.poster_path}`} alt={serie.name} />
            </div>
          ))}
        </div>

      </main >
    </>
  )
}

export default App
