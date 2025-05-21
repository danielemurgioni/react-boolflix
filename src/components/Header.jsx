import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

//destrutturo le props
const Header = ({ inputValue, changeValue, search }) => {
    return (
        <header>
            <div className="d-flex j-content-between p-20">
                <h1>boolflix</h1>
                <div className="search-bar">
                    <input
                        className="inp-search"
                        placeholder="Cerca uno show..."
                        type="text"
                        value={inputValue}
                        onChange={changeValue} />
                    <button className="btn-search" onClick={search}><FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} /></button>
                </div>
            </div>
        </header>
    )
}

export default Header