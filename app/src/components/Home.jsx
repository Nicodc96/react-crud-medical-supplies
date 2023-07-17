import { Link } from 'react-router-dom';
import equiposMedicos from '../assets/equipos-medicos.jpg';
import logoReact from '../assets/react.svg';
import imgDesfibrilador from '../assets/desfibrilador.png';
import imgMesaQuirurgica from '../assets/mesa_quirurgica.jpg';
import imgUltrasonido from '../assets/ultrasonido-estacionario.jpg';

export const Home = () => {
    return (
        <>
            <section id="mainGridInfo">
                <section className="container-fluid pt-3 mt-3">
                    <div className="row border-top border-bottom border-2 border-gray" id="divRow1Maingrid">
                        <div className="col ps-0 pe-0">
                            <img src={equiposMedicos} className="img-fluid" alt="equipos-medicos" id="imgGridMain" />
                        </div>
                        <div className="col ps-0 pe-0 bg-maingrid-text text-white border-start border-2 border-gray pb-5" id="div-row2-maingrid">
                            <div className='d-flex'>
                                <img src={logoReact} className='img-fluid px-3' alt="logo-react" />
                                <p className="fs-3 fw-semibold pt-3">Acerca del proyecto</p>
                            </div>
                            <p className="ps-3 text-md-start me-2">
                                La aplicación fue desarrollada durante la cursada de Codo a Codo React, 2023 durante los meses de Marzo a Julio. 
                                Allí aprendimos sobre el uso y el manejo de la librería <span className='fw-semibold'>React</span> y sobre la utilización 
                                de este en aplicaciones reales consumiendo una información proporcionada por una API externa o interna.
                            </p>
                            <p className="ps-3 text-md-start me-2">Este proyecto está orientado a la creación, lectura, edición y eliminación (CRUD) de equipos médicos.</p>
                            <p className="ps-3 text-md-start me-2 mt-2 fst-italic">El proyecto es una versión completamente personal del proyecto original diseñado en conjunto.</p>
                            <Link to={'https://github.com/Nicodc96/react-23307-elchavodel8'} target='_blank'>
                                <button className="btn btn-outline-light ms-3">Link al repositorio</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </section>
            <section id="main-cards-casas">
                <h2 className="text-center pt-4 fs-2 pb-4 fw-lighter">Ejemplos de equipos médicos:</h2>
                <div id="cardsCasas" className="container fluid d-flex gap-3 justify-content-center">
                    <article className="card">
                        <div className="card-img-container">
                            <img src={imgDesfibrilador} className="card-img-top" alt="casa_de_lujo_lago" />
                        </div>
                        <div className="card-body bg-gray"> 
                            <h3 className="card-title fs-3 pb-2 text-center">Desfibriladores</h3>
                            <p className="card-text mb-1">Trata afecciones letales como la fibrilación ventricular, las arritmias cardí­acas y la taquicardia. Cuando la energí­a eléctrica se administra a través de una dosis terapéutica, el desfibrilador cesa la arritmia y restablece el ritmo normal en el corazón del paciente.</p>
                            <p className="card-text fw-semibold text-green mt-2">Cardiología</p>
                        </div>
                    </article>
                    <article className="card">
                        <div className="card-img-container">
                            <img src={imgMesaQuirurgica} className="card-img-top" alt="casa_de_lujo_moderna" />
                        </div>
                        <div className="card-body bg-gray">
                            <h3 className="card-title fs-3 pb-2 text-center">Mesas Quirurgicas</h3>
                            <p className="card-text mb-1 pb-5">Para el tratamiento médico y los procedimientos quirúrgicos, las camas y mesas de recuperación de los pacientes son el equipo que debe poseer todo hospital.</p>
                            <p className="card-text fw-semibold text-green mt-2">Cirugía</p>
                        </div>
                    </article>
                    <article className="card">
                        <div className="card-img-container">
                            <img src={imgUltrasonido} className="card-img-top" alt="casa_con_piscina" />
                        </div>
                        <div className="card-body bg-gray">
                            <h3 className="card-title fs-3 pb-2 text-center">Ultrasonido Estacionario</h3>
                            <p className="card-text mb-1 pb-5">El equipo se usa principalmente para medir la densidad, el tamaño y la estructura de la masa interna del cuerpo y también ayuda a identificar posibles anomalí­as internas.</p>
                            <p className="card-text fw-semibold text-green mt-2">Cuidados Intensivos</p>
                        </div>
                    </article>
                </div>
                <div className="container-fluid d-flex justify-content-end pt-5" id="contenedorBtnTarjetas">
                    <Link to={'/equipos'}>
                        <button id="botonTarjetas" className="btn pe-5">Ver tabla de datos</button>
                    </Link>
                </div>
            </section>
        </>
    )
};