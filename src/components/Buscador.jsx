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
        <form id="buscadorContainer" onSubmit={handleSubmit}>
            <input 
                id="buscadorInput"
                className="form-control"
                type="text" 
                value={searchText} 
                onChange={(e)=>setSearchText(e.target.value)} 
                placeholder="Búsqueda por nombre"
            />
            <button 
                type="submit"
                className="btn btn-primary"><FaSearch className="mb-1"/>
            </button>
        </form>
    )
}