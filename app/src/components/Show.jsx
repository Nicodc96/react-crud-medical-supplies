import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Button } from "react-bootstrap";
import { Buscador } from "./Buscador";
import { Loading } from "./Loading";
import { Card } from "./Card";

export const Show = () => { 
    const [equipments, setEquipments] = useState([]);
    const equipmentCollection = collection(db, "medicalSupplies");
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(0);

    // Función para mostrar los documentos
    const getEquipments = async (pagina) => {
        const data = await getDocs(equipmentCollection);
        const datosTotales = [...data.docs.map(doc => ({
          ...doc.data(),
              id: doc.id
          }))];
        const equiposMedicosPaginado = [];
        for (let i = 0; i < datosTotales.length; i++){
          if (i % 12 === 0 && i != 0){
            equiposMedicosPaginado.push({
             page: i/12,
             docs: i == 12 ? 
             [...datosTotales.slice(undefined, i)] : [...datosTotales.slice(i, i+12)]
            });
          }          
        }
        setMaxPages(equiposMedicosPaginado.length);
        for (let i = 0; i < equiposMedicosPaginado.length; i++){
          if (equiposMedicosPaginado[i].page == pagina){
            setEquipments(equiposMedicosPaginado[i].docs);
            break;
          }
        }
    };

    useEffect(() => {
        getEquipments(page);
    }, [page]);

    if (equipments.length === 0) return (<><Loading/></>);

    return <>
        <section className="mt-4">
          <div className="row width-95">
            <div className="col-3 d-flex flex-column align-items-center" id="containerControlsCards">
              <Link to="/create">
                <Button variant="success" className="mt-2 mb-2">Agregar un equipo</Button>
              </Link>
              <Buscador />
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
        {/* <div className="d-flex justify-content-center" id="contenedorOpcionesTabla">
          <div>
            <Link to="/create">
              <Button variant="success" className="mt-2 mb-2">Agregar un equipo</Button>
            </Link>
          </div>
          <Buscador />
        </div>
        <div className="container-fluid" id="contenedorTabla">
          <Table bordered hover responsive id="tablaEquipamentos">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Estado</th>
                <th>Cantidad</th>
                <th>Antigüedad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((equipment) => (
                <tr key={equipment.id}>
                  <td className="text-center">{equipment.nombre}</td>
                  <td className="text-center">{equipment.marca}</td>
                  <td className="text-center">{equipment.modelo}</td>
                  <td className="text-center">{equipment.estado}</td>
                  <td className="text-center">{equipment.cantidad}</td>
                  <td className="text-center">{equipment.antiguedad === 0 ?
                  `Nuevo` : (equipment.antiguedad === 1 ? `${equipment.antiguedad} año` :
                  `${equipment.antiguedad} años`)}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/edit/${equipment.id}`}>
                        <Button variant="warning">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="-1 1 23 23"
                            strokeWidth="2"
                            stroke="#000000"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                            <line x1="16" y1="5" x2="19" y2="8" />
                          </svg>
                        </Button>
                      </Link>
                      <Button variant="danger" onClick={() => confirmRemove(equipment.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="-1 1 23 23"
                          strokeWidth="2"
                          stroke="#FFFFFF"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <line x1="4" y1="7" x2="20" y2="7" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div id="contenedorPaginacion" className="d-flex justify-content-between">
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
          </div>
        </div> */}
      </>
    ;
}