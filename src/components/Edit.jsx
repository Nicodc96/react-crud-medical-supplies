import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebaseConfig/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { Loading } from './Loading';
import { Card } from "./CardShow";
import Swal from 'sweetalert2';

export const Edit = () => {
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [estado, setEstado] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [antiguedad, setAntiguedad] = useState(0);
    const [imgSrc, setImgSrc] = useState("");
    const [imgUpload, setImgUpload] = useState(null);
    const [equipment, setEquipment] = useState(null);

    const navigate = useNavigate();
    const { equipmentId } = useParams();

    const uploadFile = async () => {
        if (imgUpload === null) return updateEquipment(null);
        const imgRef = ref(storage, `images/${nombre + v4()}`);
        uploadBytes(imgRef, imgUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                return updateEquipment(url);
            })
        });
    }

    const updateEquipment = async (imgSrcParam) => {
        const dataDB = doc(db, "medicalSupplies", equipmentId);
        const data = {
            nombre: nombre,
            marca: marca,
            modelo: modelo,
            estado: estado,
            cantidad: Number(cantidad),
            antiguedad: Number(antiguedad),
            imgsrc: imgSrcParam ?? imgSrc // Si no se carga ninguna imagen, se deja la que estaba
        };
        // El primer parámetro es la información del doc, el segundo la información a reemplazar
        return await updateDoc(dataDB, data);
    }

    const getEquipmentById = async (id) => {
        const equipmentDoc = await getDoc(await doc(db, "medicalSupplies", id));
        if (equipmentDoc.exists()){
            setEquipment(equipmentDoc.data());
            setNombre(equipmentDoc.data().nombre);
            setMarca(equipmentDoc.data().marca);
            setModelo(equipmentDoc.data().modelo);
            setEstado(equipmentDoc.data().estado);
            setCantidad(equipmentDoc.data().cantidad);
            setAntiguedad(equipmentDoc.data().antiguedad);
            setImgSrc(equipmentDoc.data().imgsrc);
        } else{
            Swal.fire({
                title: "Equipo médico no encontrado",
                icon: 'error',
                confirmButtonColor: '#6c757d',
                confirmButtonText: 'Volver'
            }).then(() => { navigate('/equipos') });
        }
    }

    const confirmModify = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Confirma modificación?',
            text: "¡Esta acción no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Modificar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                uploadFile()
                .then(() => {
                    Swal.fire(
                        'Modificado.',
                        'El equipo médico ha sido modificado exitosamente.',
                        'success'
                        ).then(() => {navigate('/equipos')});
                })
                .catch((error) => {
                    Swal.fire(
                        'Ha ocurrido un error.',
                        `Razón: ${error}`,
                        'error'
                    )
                });
            }
          })
    }

    useEffect(() => {
        getEquipmentById(equipmentId);
    }, []);

    if ((!nombre || !marca || !modelo || !estado || cantidad == 0) && antiguedad == 0) return (<><Loading /></>);
    return (
    <>
    <section id="contenedorTituloEdit">
        <h2 className="text-center pt-4 fw-semibold pb-0 mb-0">Modificar un equipo médico</h2>
    </section>
    <section className="row width-95">
        <div className="col ps-0 pe-0" id="colFormularioEdit">
            <section className="d-flex justify-content-center pt-4">
                <article className='d-flex flex-column align-items-center border border-2 rounded px-5 pe-5 pb-3' id='contenedorForm'>
                    <h2 className='mt-4 mb-5 fs-3 fw-lighter'>Complete el formulario</h2>
                    <form id='formEdit' onSubmit={confirmModify}>
                        <div className="row" id="contenedorInputsLabelsEdit">
                            <div className="col-4 mb-3 d-flex flex-column align-items-center gap-4">
                                <label htmlFor='inputNombre' className='form-label'>Nombre: </label>
                                <label htmlFor='formMarca' className='form-label'>Marca: </label>
                                <label htmlFor='formModelo' className='form-label'>Modelo: </label>
                                <label htmlFor='formEstado' className='form-label'>Estado: </label>
                                <label htmlFor='formCantidad' className='form-label'>Cantidad: </label>
                                <label htmlFor='formAntiguedad' className='form-label'>Antiguedad: </label>
                                <label htmlFor='formImagen' className='form-label'>Imagen: </label>
                            </div>
                            <div className="col-8 mb-3 d-flex flex-column align-items-center gap-3 px-0 pe-0">
                                <input 
                                    type="text" 
                                    name='inputNombre' 
                                    className='form-control' 
                                    value={nombre} 
                                    onChange={(e) => setNombre(e.target.value)} 
                                    id='formNombre'
                                />
                                <input 
                                    type="text" 
                                    name='formMarca'
                                    className='form-control' 
                                    value={marca} 
                                    onChange={(e) => setMarca(e.target.value)}
                                    id='formMarca'
                                />
                                <input 
                                    type="text" 
                                    name='formModelo' 
                                    className='form-control' 
                                    value={modelo} 
                                    onChange={(e) => setModelo(e.target.value)} 
                                    id='formModelo'
                                />
                                <input 
                                    type="text" 
                                    name='formEstado' 
                                    className='form-control' 
                                    value={estado} 
                                    onChange={(e) => setEstado(e.target.value)} 
                                    id='formEstado'
                                />
                                <input 
                                    type="number" 
                                    name='formCantidad' 
                                    className='form-control' 
                                    value={cantidad} 
                                    onChange={(e) => setCantidad(e.target.value)} 
                                    id='formCantidad'
                                    min='1' max='99'
                                />
                                <input 
                                    type="number" 
                                    name='formAntiguedad' 
                                    className='form-control' 
                                    value={antiguedad} 
                                    onChange={(e) => setAntiguedad(e.target.value)} 
                                    id='formAntiguedad'
                                    min='0' max='50'
                                />
                                <input 
                                    type="file"
                                    name='formImagen'
                                    className='form-control'
                                    accept='image/png, image/jpeg, image/jpg'
                                    onChange={(e) => { setImgUpload(e.target.files[0]) }}
                                    id='formImagen'
                                />
                            </div>
                        </div>
                        <div className='d-flex justify-content-evenly mt-4'>
                            <Button variant='success' type="submit">Modificar</Button>
                            <Link to="/equipos">                        
                                <Button variant='secondary'>Cancelar</Button>
                            </Link>
                        </div>
                    </form>
                </article>
            </section>
        </div>
        <div className="col d-flex justify-content-center ps-0 pe-0" id="colCardEdit">            
            <div id="contenedorCardEdit">
                <Card equipment={equipment} enableButtons={false} key={equipmentId} />
            </div>
        </div>
    </section>
    <div className="d-flex justify-content-center">
        <div id="contenedorBtnVolverEdit">
        <Link to="/equipos">                        
            <Button variant='secondary'>Volver al inicio</Button>
        </Link>
        </div>
    </div>
    </>
    )
}