import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Button } from "react-bootstrap";
import { Buscador } from "./Buscador";
import { Loading } from "./Loading";
import { Card } from "./CardShow";
import { AuxiliarFunctions } from "../functions/auxFuncions";

export const Show = () => {
    const [equipments, setEquipments] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(0);
    const [ordenamiento, setOrdenamiento] = useState(0);  
    
    const equipmentCollection = collection(db, "medicalSupplies");

    /**
     * Obtiene todos los documentos de tipo *Equipo Médico* de la db de firebase llamada 'medicalSupplies'. 
     * Ordena la información para mostrarla por páginas de 12 docs/pag.
     * @param {Number} pagina Número de la página actual
     */
    const getEquipments = async (pagina, orden) => {
        const data = await getDocs(equipmentCollection);
        const datosTotales = [...data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
          }))];
        const equiposMedicosPaginado = [];
        if (datosTotales.length <= 12){
          equiposMedicosPaginado.push({
            page: 1,
            docs: [...datosTotales]
          });
        } else{
          for (let i = 0; i < datosTotales.length; i++){
            if (i % 12 === 0 && i !== 0){
              equiposMedicosPaginado.push({
               page: i/12,
               docs: i === 12 ? 
               [...datosTotales.slice(undefined, i)] : [...datosTotales.slice(i, i+12)]
              });
            }
          }
        }
        setMaxPages(equiposMedicosPaginado.length);
        equiposMedicosPaginado.forEach(equipo => {
          if (equipo.page === pagina){
            setEquipments(AuxiliarFunctions.ordenarEquipos(equipo.docs, orden));
            return;
          }
        });
    };

    useEffect(() => {
        getEquipments(page, ordenamiento);
    }, [page, ordenamiento]);

    if (equipments.length === 0) return (<><Loading/></>);

    return (
      <>
        <section className="mt-4 mb-5">
          <h2 className="text-center fs-2 pb-4 fw-lighter">Todos los equipos médicos</h2>
          <div className="row width-95">
            <div className="col-3">
              <div id="containerControlsCards">
                <Buscador />
                <div className="divisor"/>
                <Link to="/create">
                  <Button variant="success" className="mt-3 mb-3">Agregar un equipo</Button>
                </Link>
                <div className="divisor"/>
                <p className="text-center fs-5 mt-1 mb-2">Ordenar datos</p>
                <section id="contenedorCheckBoxOrdenar">
                  <div className="row">
                    <div className="col-2 d-flex flex-column gap-1">
                      <input type="radio" className="form-check-input" name="radioOrdenamiento" id="chkOrdenarAZ"
                      onClick={() => setOrdenamiento(1)}/>
                      <input type="radio" className="form-check-input" name="radioOrdenamiento" id="chkOrdenarZA"
                      onClick={() => setOrdenamiento(2)}/>
                      <input type="radio" className="form-check-input" name="radioOrdenamiento" id="chkOrdenarCantidad"
                      onClick={() => setOrdenamiento(3)}/>
                      <input type="radio" className="form-check-input" name="radioOrdenamiento" id="chkOrdenarAntiguedad"
                      onClick={() => setOrdenamiento(4)}/>
                    </div>
                    <div className="col-10 d-flex flex-column">
                      <label htmlFor="chkOrdenarAZ" className="form-check-label">Alfabéticamente (A-Z)</label>
                      <label htmlFor="chkOrdenarZA" className="form-check-label">Invertido (Z-A)</label>
                      <label htmlFor="chkOrdenarCantidad" className="form-check-label">Según cantidad</label>
                      <label htmlFor="chkOrdenarAntiguedad" className="form-check-label">Según antigüedad</label>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="col-9 d-flex gap-3 flex-wrap justify-content-center" id="contenedorCards">
              {equipments.map(equipment => (<Card equipment={equipment} key={equipment.id}/>))}
            </div>
          </div>
          <div className="row width-95">
            <section className="col-3"></section>
            <section className="col-9" id="contenedorPaginacion">
              <Button 
                className={page === 1 ? "btn primary disabled" : "primary"}
                onClick={() => page === 1 ? setPage(page) : setPage(page-1)}>
                Página anterior
              </Button>
              <p className="fw-semibold">Página: {page}</p>
              <Button 
                className={page === maxPages ? "btn primary disabled" : "primary"} 
                onClick={() => page <= maxPages ? setPage(page+1) : setPage(maxPages)}>
                Página Siguiente
              </Button>
            </section>
          </div>
        </section>
      </>
    )
}