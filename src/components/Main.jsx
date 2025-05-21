/*Fontawensome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" //componente
import { faStar as fullstar } from "@fortawesome/free-solid-svg-icons" //icona Stella piena (rinominato con "as" per differenziare due icone uguali ma con stili diversi  )
import { faStar as emptystar } from "@fortawesome/free-regular-svg-icons" //icona Stella vuota

const Main = ({ movies, series }) => {

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
        <main>
            {/* card movies */}
            <div className="container shows-data">
                <h2>Movies</h2>
                <div className="d-flex flex-wrap">
                    {movies.map((movie) => (
                        <div key={movie.id} className="show-info col-30" >
                            <div className="show-card">
                                <img
                                    className="poster"
                                    src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <div className="show-overlay">
                                    <p>Titolo Originale: {movie.original_title}</p>
                                    <p>Titolo: {movie.title}</p>
                                    <p>Lingua: {languageToFlag(movie.original_language)}</p>
                                    <div className="vote">{voteToStars(convertVote(movie.vote_average))}</div>
                                </div>
                            </div>
                        </div >
                    ))}
                </div >
            </div >

            {/* card TV Series */}
            <div className="container shows-data">
                <h2>TV Series</h2>
                <div className="d-flex flex-wrap">
                    {series.map((serie) => (
                        <div key={serie.id} className="show-info col-30" >
                            <div className="show-card">
                                <img
                                    className="poster"
                                    src={`http://image.tmdb.org/t/p/w342/${serie.poster_path}`}
                                    alt={serie.name}
                                />
                                <div className="show-overlay">
                                    <p>Titolo Originale: {serie.original_name}</p>
                                    <p>Titolo: {serie.name}</p>
                                    <p>Lingua: {languageToFlag(serie.original_language)}</p>
                                    <div className="vote">{voteToStars(convertVote(serie.vote_average))}</div>
                                </div>
                            </div>
                        </div >
                    ))}
                </div >
            </div >

        </main >
    )
}

export default Main