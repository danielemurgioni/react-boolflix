import { useEffect, useState } from "react"
import axios from "axios"

/*Components*/
import Header from "./components/Header"
import Main from "./components/Main"

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
    //chiamo l'endpoint tramite axios e salvo i dati nella variabile di stato tramite useState
    axios.get(endpoint).then((res) => setState(res.data.results))
    console.log(endpoint)
  }

  //hook useEffect --> esegue il codice ogni volta che il queryValue viene aggiornato
  useEffect(() => {
    getShow(endpointMovies, setArrMovies)
    getShow(endpointTVseries, setArrTVseries)
  }, [queryValue])

  const handleSearch = () => {
    setQueryValue(inpValue)
  }

  return (
    <>
      <Header
        inputValue={inpValue}
        changeValue={(e) => (setInpValue(e.target.value))}
        search={handleSearch}
      />
      <Main
        movies={arrMovies}
        series={arrTVseries}
      />
    </>
  )
}

export default App
