import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { db } from "../firebaseConfig/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

const removeEquipment = async (id) => {
    const equipmentDoc = doc(db, "medicalSupplies", id);
    return await deleteDoc(equipmentDoc);
};

const confirmRemove = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            removeEquipment(id);
            Swal.fire(
            '¡Eliminado!',
            'El equipo médico se ha eliminado.',
            'success'
          ).then(() => {location.reload()});
        }
      })
};

export const Card = ({equipment}) => {
    return (
        <>
            <article className="card card-size">
                <img src="..." alt={equipment.nombre} className="card-img-top-custom" />
                <div className="card-body">
                    <h5 className="card-title text-center">{equipment.nombre}</h5>
                    <ul>
                        <li><span className="fw-semibold">Marca:</span> {equipment.marca}</li>
                        <li><span className="fw-semibold">Modelo:</span> {equipment.modelo}</li>
                        <li><span className="fw-semibold">Estado:</span> {equipment.estado}</li>
                        <li><span className="fw-semibold">Cantidad:</span> {equipment.cantidad === 0 ? `Sin stock` :
                            (equipment.antiguedad === 1 ?
                                `${equipment.cantidad} unidad` :
                                `${equipment.cantidad} unidades`)}
                        </li>
                        <li><span className="fw-semibold">Antigüedad:</span> {equipment.antiguedad === 0 ? `Nuevo` : 
                            (equipment.antiguedad === 1 ?
                            `${equipment.antiguedad} año` :
                            `${equipment.antiguedad} años`)}
                        </li>
                    </ul>
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
                </div>
            </article>
        </>
    )
}