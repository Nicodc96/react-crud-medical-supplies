import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { db, storage } from '../firebaseConfig/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';

export const Create = () => {
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [estado, setEstado] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [antiguedad, setAntiguedad] = useState(0);
    const [imgUpload, setImgUpload] = useState(null);

    const equipmentCollection = collection(db, "medicalSupplies");
    const navigate = useNavigate();

    const createEquipment = async (imgsrc) => {
        return await addDoc(equipmentCollection, {
            nombre: nombre,
            marca: marca ? marca : "Sin datos",
            modelo: modelo ? modelo : "Sin datos",
            estado: estado,
            cantidad: Number(cantidad),
            antiguedad: Number(antiguedad),
            imgsrc: imgsrc
        });
    }

    const uploadFile = async () => {
        if (imgUpload === null) return createEquipment(null);
        const imgRef = ref(storage, `images/${nombre + v4()}`);
        uploadBytes(imgRef, imgUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                return createEquipment(url);
            })
        });
    }

    const confirmCreate = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Confirma crear el equipo médico?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Crear',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                uploadFile()
                .then(() => {
                    Swal.fire(
                        '¡Creado!',
                        `Se ha creado un equipo médico exitosamente.`,
                        'success'
                    ).then(() => {navigate('/equipos')});
                })
                .catch((error) => {
                    Swal.fire(
                        'Ha ocurrido un error.',
                        `Razón: ${error}`,
                        'error'
                    );
                })         
            }
          })
    }
    return (
        <section className="d-flex justify-content-center pt-5 pb-5">
            <article className='d-flex flex-column align-items-center border border-2 rounded px-5 pe-5 pb-3' id='contenedorForm'>
                <h2 className='mt-4 mb-3 fs-4'>Registro de un Equipo Médico</h2>
                <form onSubmit={confirmCreate}>
                <div className="row">
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
                            placeholder='Nombre del equipo médico'
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            id='formNombre'
                            required
                        />
                        <input 
                            type="text" 
                            name='formMarca'
                            className='form-control' 
                            placeholder='Marca del equipo médico'
                            value={marca} 
                            onChange={(e) => setMarca(e.target.value)}
                            id='formMarca'
                        />
                        <input 
                            type="text" 
                            name='formModelo' 
                            className='form-control' 
                            placeholder='Marca o número de referencia'
                            value={modelo} 
                            onChange={(e) => setModelo(e.target.value)} 
                            id='formModelo'
                        />
                        <input 
                            type="text" 
                            name='formEstado' 
                            className='form-control' 
                            placeholder='Estado en el que se encuentra'
                            value={estado} 
                            onChange={(e) => setEstado(e.target.value)} 
                            id='formEstado'
                            required
                        />
                        <input 
                            type="number" 
                            name='formCantidad' 
                            className='form-control' 
                            placeholder='Stock del equipo médico'
                            value={cantidad} 
                            onChange={(e) => setCantidad(e.target.value)} 
                            id='formCantidad'
                            min='1' max='100'
                        />
                        <input 
                            type="number" 
                            name='formAntiguedad' 
                            className='form-control'
                            placeholder='Cuantos años tiene el equipo'
                            value={antiguedad} 
                            onChange={(e) => setAntiguedad(e.target.value)} 
                            id='formAntiguedad'
                            min='0' max='20'
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
                        <Button variant='success' type="submit">Crear</Button>
                        <Link to="/equipos">                        
                            <Button variant='secondary'>Cancelar</Button>
                        </Link>
                    </div>
                </form>
            </article>
        </section>
    )
}