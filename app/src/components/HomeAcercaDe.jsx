import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import reactLogo from '../assets/react-logo.png';

export const AcercaDe = () => {
    return (
        <>
            <section id="contenedorAcercaDe">
                <article className="d-flex justify-content-center">
                    <div className="d-flex justify-content-center gap-3">
                        <h2 className="mt-2 text-white-50 fw-lighter">Acerca del proyecto</h2>
                        <div id="contenedorAcercaDeIcon">
                            <FaChevronDown 
                                className="text-white-50"
                                id="acercaDeIcon"
                                size={20}
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseInfoAcercaDe" 
                                aria-expanded="false"
                                aria-controls="collapseInfoAcercaDe"
                            />
                        </div>
                    </div>
                </article>
            </section>
            <section className="collapse" id="collapseInfoAcercaDe">
                <div className="d-flex justify-content-center">
                    <img src={reactLogo} id="imgBgInfoAcercaDe" />
                </div>
                <div className="text-white" id="containerInfoAcercaDeText">
                    <p className="ps-3 text-center me-2">
                        La aplicación fue desarrollada durante la cursada de Codo a Codo React, 2023 durante los meses de Marzo a Julio. 
                        Allí aprendimos sobre el uso y el manejo de la librería <span className='fw-semibold'>React</span> y sobre la utilización 
                        de este en aplicaciones reales consumiendo una información proporcionada por una API externa o interna.
                    </p>
                    <p className="ps-3 text-center me-2">Este proyecto está orientado a la creación, lectura, edición y eliminación (CRUD) de equipos médicos.</p>
                    <p className="ps-3 text-center me-2 mt-2 fst-italic">El proyecto es una versión completamente personal del proyecto original diseñado en conjunto.</p>
                    <div className="d-flex justify-content-center">
                        <Link to={'https://github.com/Nicodc96/react-crud-medical-supplies'} target='_blank'>
                            <button className="btn btn-outline-light ms-3">Link al repositorio</button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}