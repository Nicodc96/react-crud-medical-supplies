import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
import { Buscador } from "./Buscador";
import { Card } from "./CardShow";
import { AuxiliarFunctions } from "../functions/auxFuncions";
import notFound from "../assets/notFound.png";

export const Equip = () => {
    const { nombre } = useParams();
    const [equipments, setEquipments] = useState([]);
    const [sinElementos, setSinElementos] = useState(false); // Esto es una bandera, para saber si encontró elementos o no después de la búsqueda
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(0);
    const [ordenamiento, setOrdenamiento] = useState(0);

    const equipmentCollection = collection(db, "medicalSupplies");

    const getEquipments = async (name, pagina, orden) => {
        const data = await getDocs(equipmentCollection);
        const arrayTemporal = data.docs.map(doc => ({...doc.data(),id:doc.id}));
        const arrayFiltrado = [];
        const equiposMedicosPaginado = [];
        const filtro = new RegExp(AuxiliarFunctions.quitarAcentos(name.toLowerCase()));
        for (let i = 0; i < arrayTemporal.length; i++){
            if (filtro.test(AuxiliarFunctions.quitarAcentos(arrayTemporal[i].nombre.toLowerCase()))){
                arrayFiltrado.push(arrayTemporal[i]);
            }
        }
        if (arrayFiltrado.length <= 12){
            equiposMedicosPaginado.push({
                page: 1,
                docs: [...arrayFiltrado]
              });
        } else{
          for (let i = 12; i <= datosTotales.length; i+=12){
            let pagina = 1;
            equiposMedicosPaginado.push({
              page: pagina,
              docs: i === 12 ? 
              [...datosTotales.slice(undefined, i)] : [...datosTotales.slice(i-12, i)]
            });
            if (i + 12 >= datosTotales.length){
              equiposMedicosPaginado.push({
                page: pagina+1,
                docs: [...datosTotales.slice(i, undefined)]
              });
              break;
            } else pagina++;
          }
      }
        setMaxPages(equiposMedicosPaginado.length);
        equiposMedicosPaginado.forEach(equipo => {
            if (equipo.page === pagina){
              setEquipments(AuxiliarFunctions.ordenarEquipos(equipo.docs, orden));
              return;
            }
        });
        if(arrayFiltrado.length === 0) setSinElementos(true);
    };

    useEffect(() => {
        getEquipments(nombre, page, ordenamiento);
    }, [nombre, page, ordenamiento]);

    if (equipments.length === 0 && !sinElementos){
        return (<><Loading /></>);
    }
    return sinElementos ? (
        // Si no encontró elementos el length va seguir siendo 0, por eso se utiliza la bandera 'sinElementos'
        <section className="container-fluid d-flex flex-column align-items-center pt-5">
            <p className="fs-2">¡No se ha encontrado el elemento solicitado!</p>
            <img src={notFound} alt="elemento_no_encontrado" className="img-fluid" width="300" />            
            <Link to="/equipos">  
                <Button variant='secondary' className="mb-4">Volver</Button>
            </Link>
        </section>
    ) : (<>
        <section className="pt-4">
          <h2 className="text-center fs-2 pb-4 fw-semibold">Listado de los equipos médicos</h2>
          <div className="row width-95">
            <div className="col-3">
              <div id="containerControlsCards">
                <Buscador />
                <div className="divisor"/>
                <Link to="/create">
                  <Button variant="success" className="mt-2 mb-2">Agregar un equipo</Button>
                </Link>
                <div className="divisor"/>
                <p className="text-center fs-5 mb-1">Ordenar datos</p>
                <section id='contenedorCheckBoxOrdenar'>
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
              <p className="fw-semibold pt-1">Página: {page}</p>
              <Button 
                className={page === maxPages ? "btn primary disabled" : "primary"} 
                onClick={() => page <= maxPages ? setPage(page+1) : setPage(maxPages)}>
                Página Siguiente
              </Button>
            </section>
          </div>
          <div className="row width-95">
            <section className="col-3"></section>
            <section className="col-9">
              <div id="contenedorBtnVolver">
                <Link to="/equipos">                        
                    <Button variant='secondary'>Volver al inicio</Button>
                </Link>
              </div>
            </section>
          </div>
        </section>        
        </>
    )
}