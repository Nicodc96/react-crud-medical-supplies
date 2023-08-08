import { Link } from 'react-router-dom';
import { AcercaDe } from './HomeAcercaDe';
import imgDesfibrilador from '../assets/desfibrilador.png';
import imgMesaQuirurgica from '../assets/mesa-quirurgica.jpg';
import imgUltrasonido from '../assets/ultrasonido-estacionario.jpg';

export const Home = () => {
    return (
    <>
        <section id="mainGridInfo">
            <section id="main-cards-home">
                <h2 className="text-center pt-4 fs-2 pb-4 fw-lighter">Nuestros equipos</h2>
                <div id="containerCardsHome" className="container fluid d-flex gap-5 justify-content-center">
                    <article className="card">
                        <div className="card-img-container">
                            <img src={imgDesfibrilador} className="card-img-top" alt="desfibrilador" />
                        </div>
                        <div className="card-body bg-gray"> 
                            <h3 className="card-title fs-3 pb-2 text-center">Desfibriladores</h3>
                            <p className="card-text mb-1">Trata afecciones letales como la fibrilación ventricular, las arritmias cardí­acas y la taquicardia. Cuando la energí­a eléctrica se administra a través de una dosis terapéutica, el desfibrilador cesa la arritmia y restablece el ritmo normal en el corazón del paciente.</p>
                            <p className="card-text fw-semibold text-blue text-center mt-4">Cardiología</p>
                        </div>
                    </article>
                    <article className="card">
                        <div className="card-img-container">
                            <img src={imgMesaQuirurgica} className="card-img-top" alt="mesa quirurgica" />
                        </div>
                        <div className="card-body bg-gray">
                            <h3 className="card-title fs-3 pb-2 text-center">Mesas Quirurgicas</h3>
                            <p className="card-text mb-1 pb-5">Para el tratamiento médico y los procedimientos quirúrgicos, las camas y mesas de recuperación de los pacientes son el equipo que debe poseer todo hospital.</p>
                            <p className="card-text fw-semibold text-blue text-center mt-4">Cirugía</p>
                        </div>
                    </article>
                    <article className="card">
                        <div className="card-img-container">
                            <img src={imgUltrasonido} className="card-img-top" alt="ultrasonido" />
                        </div>
                        <div className="card-body bg-gray">
                            <h3 className="card-title fs-3 pb-2 text-center">Ultrasonido Estacionario</h3>
                            <p className="card-text mb-1 pb-5">El equipo se usa principalmente para medir la densidad, el tamaño y la estructura de la masa interna del cuerpo y también ayuda a identificar posibles anomalí­as internas.</p>
                            <p className="card-text fw-semibold text-blue text-center mt-4">Cuidados Intensivos</p>
                        </div>
                    </article>
                </div>
                <div className="d-flex justify-content-center pt-5" id="contenedorBtnTarjetas">
                    <Link to={'/equipos'}>
                        <button type="button" id="botonTarjetas" className="btn pe-5">Ver todos los equipos</button>
                    </Link>
                </div>
            </section>
            <AcercaDe />
        </section>
    </>
    )
};