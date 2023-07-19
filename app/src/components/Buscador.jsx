import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Buscador = () => {
    const navigate = useNavigate();    
    const [searchText, setSearchText] = useState("");
    
    // Función que capture lo que ingresamos en el buscador y lo envia a la URL
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/equipos/${searchText}`);
    }
    return (
        <form className="buscadorContainer" onSubmit={handleSubmit}>
            <div className="buscadorBox">
                <input className="buscadorInput" type="text" 
                value={searchText} onChange={(e)=>setSearchText(e.target.value)} 
                placeholder="'Enter' para buscar"/>
                <button type="submit" className="buscadorButton"><FaSearch /></button>
            </div>
        </form>
    )
}