import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { Buscador } from "./Buscador";
import { Card } from "./Card";
import notFound from "../assets/notFound.png";

export const Equip = () => {
    const { nombre } = useParams();
    const [equipments, setEquipments] = useState([]);
    // Esto es una bandera, para saber si encontró elementos o no después de la búsqueda
    const [sinElementos, setSinElementos] = useState(false);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(0);

    const equipmentCollection = collection(db, "medicalSupplies");

    const getEquipments = async (name, pagina) => {
        const data = await getDocs(equipmentCollection);
        const arrayTemporal = data.docs.map(doc => ({...doc.data(),id:doc.id}));
        const arrayFiltrado = [];
        const equiposMedicosPaginado = [];
        const filtro = new RegExp(name.toLowerCase());
        for (let i = 0; i < arrayTemporal.length; i++){
            if (filtro.test(arrayTemporal[i].nombre.toLowerCase())){
                arrayFiltrado.push(arrayTemporal[i]);
            }
        }
        if (arrayFiltrado.length <= 12){
            equiposMedicosPaginado.push({
                page: 1,
                docs: [...arrayFiltrado]
              });
        } else{
            for (let i = 0; i < arrayFiltrado.length; i++){
                if (i % 12 === 0 && i != 0){
                  equiposMedicosPaginado.push({
                   page: i/12,
                   docs: i == 12 ? 
                   [...arrayFiltrado.slice(undefined, i)] : [...arrayFiltrado.slice(i, i+12)]
                  });
                }
              }
        }
        setMaxPages(equiposMedicosPaginado.length);
        for (let i = 0; i < equiposMedicosPaginado.length; i++){
            if (equiposMedicosPaginado[i].page == pagina){
              setEquipments(equiposMedicosPaginado[i].docs);
              break;
            }
        }
        if(arrayFiltrado.length === 0) setSinElementos(true);
    };

    useEffect(() => {
        getEquipments(nombre, page);
    }, [nombre, page]);

    if (equipments.length === 0 && !sinElementos){
        return (<><Loading /></>);
    }
    return sinElementos ? (
        // Si no encontró elementos el length va seguir siendo 0, por eso utilizo la bandera 'sinElementos'
        <section className="container-fluid d-flex flex-column align-items-center">
            <p className="fs-2">¡No se ha encontrado el elemento solicitado!</p>
            <img src={notFound} alt="elemento_no_encontrado" className="img-fluid" width="300" />            
            <Link to="/equipos">  
                <Button variant='secondary'>Volver</Button>
            </Link>
        </section>
    ) : (<>
        <section className="mt-4">
            <div className="row width-95">
                <div className="col-3">
                    <div id="containerControlsCards">
                        <Buscador />
                        <Link to="/create">
                            <Button variant="success" className="mt-2 mb-2">Agregar un equipo</Button>
                        </Link>
                    </div> 
                </div>
                <div className="col-9 d-flex gap-3 flex-wrap justify-content-center" id="contenedorCards">
                    {equipments.map((equipment) => (<Card equipment={equipment} key={equipment.id}/> ))}
                </div>
            </div>
            <div className="row width-95">
                <section className="col" id="contenedorPaginacion">
                <Button 
                    className={page == 1 ? "btn primary disabled" : "primary"}
                    onClick={() => page == 1 ? setPage(page) : setPage(page-1)}>
                    Página anterior
                </Button>
                <p className="fw-semibold">Página: {page}</p>
                <Button 
                    className={page == maxPages ? "btn primary disabled" : "primary"} 
                    onClick={() => page <= maxPages ? setPage(page+1) : setPage(maxPages)}>
                    Página Siguiente
                </Button>
                </section>
            </div>
        </section>
        <div id="contenedorBtnVolver">
            <Link to="/equipos">                        
                <Button variant='secondary'>Inicio</Button>
            </Link>
        </div>
        </>
    )
}