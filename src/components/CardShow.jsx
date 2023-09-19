import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { db, storage } from "../firebaseConfig/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { listAll, ref, getDownloadURL, deleteObject } from "firebase/storage";
import Swal from "sweetalert2";
import imgNotAvailable from '../assets/image_not_available.png';

export const Card = ({equipment, enableButtons}) => {
    const imageListRef = ref(storage, "/images");

    /* DELETE REFERENCE AND ITEM FROM FIREBASE */
    const removeEquipment = async (id) => {
        const equipmentDoc = doc(db, "medicalSupplies", id);
        await deleteImg(((await getDoc(equipmentDoc)).data()).imgsrc);
        await deleteDoc(equipmentDoc);
    };    

    const deleteImg = async (imgsrc) => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    if (imgsrc === url){
                        return deleteObject(item);
                    }
                })
            })
        });
    }
    
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
          .catch((error) => {
            Swal.fire(
                'Ha ocurrido un error.',
                `Razón: ${error}`,
                'error'
            );
        })
    };

    /* Auxiliary functions to manage elements to render on cards */
    const setClassCardTitle = () => equipment.nombre.length >= 21 ? 'card-title text-center fs-6 fw-semibold' :
    'card-title text-center fs-5 fw-semibold';

    const manageCardTextCantidad = (cantidad, antiguedad) => cantidad === 0 ? 'Sin stock' : 
    (antiguedad === 1 ? `${cantidad} unidad` : `${cantidad} unidades`);

    const manageCardTextAntiguedad = antiguedad => antiguedad === 0 ? 'Nuevo' :
    (antiguedad === 1 ? `${antiguedad} año` : `${antiguedad} años`);

    const setClassButtonModificar = () => !enableButtons ? "btn-modificar disabled" : "btn-modificar";

    const setClassButtonEliminar = () => {
        if (!enableButtons) return 'disabled';
    }

    const manageButtonEliminar = (id) => {
        if (!enableButtons) return confirmRemove(id);
    }

    const manageLinkButton = (id) => enableButtons ? `/edit/${id}` : "";

    return (
        <>
        <article className="card card-size">
            <div className="d-flex justify-content-center card-img-container">
                <img src={equipment.imgsrc ?? imgNotAvailable} alt={equipment.nombre} className="card-img-top-custom" />
            </div>
            <div className="card-body">
                <p className={setClassCardTitle()}>
                    {equipment.nombre}
                </p>
                <ul>
                    <li><span className="fw-semibold">Marca:</span> {equipment.marca}</li>
                    <li><span className="fw-semibold">Modelo:</span> {equipment.modelo}</li>
                    <li><span className="fw-semibold">Estado:</span> {equipment.estado}</li>
                    <li><span className="fw-semibold">Cantidad:</span>
                        {manageCardTextCantidad(equipment.cantidad, equipment.antiguedad)}
                    </li>
                    <li><span className="fw-semibold">Antigüedad:</span>
                        {manageCardTextAntiguedad(equipment.antiguedad)}
                    </li>
                </ul>
                <div className="d-flex justify-content-center gap-2">
                    <Link to={manageLinkButton(equipment.id)}>
                        <Button variant="warning" className={setClassButtonModificar()}>
                            <FaEdit size='20px' className="mb-1"/> Modificar
                        </Button>
                    </Link>
                    <Button 
                        variant="danger"
                        className={setClassButtonEliminar()}
                        onClick={() => { manageButtonEliminar(equipment.id) }}>
                        <FaTrashAlt size='20px' className="mb-1"/> Eliminar
                    </Button>
                </div>
            </div>
        </article>
        </>
    )
}