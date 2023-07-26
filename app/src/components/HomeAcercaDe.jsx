import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import reactLogo from '../assets/react.svg';
import firebaseLogo from '../assets/firebase.svg';
import bootstrapLogo from '../assets/bootstrap.svg';
import jsLogo from '../assets/javascript.svg';
import nodejsLogo from '../assets/nodejs.svg';

export const AcercaDe = () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
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
                <div className="row width-95">
                    <div className="col-8">
                        <div className="text-white" id="containerInfoAcercaDeText">
                            <p className="ps-3 me-2">
                                La aplicación fue desarrollada durante la cursada de Codo a Codo React 2023, durante los meses de Marzo a Julio. 
                                Allí aprendimos sobre el uso y el manejo de la librería <span className='fw-semibold'>React</span> y sobre la utilización 
                                de este en aplicaciones reales consumiendo una información proporcionada por una API externa o interna.
                            </p>
                            <p className="ps-3 me-2">Este proyecto está orientado a la creación, lectura, edición y eliminación (CRUD) de equipos médicos.</p>
                            <p className="ps-3 me-2 mt-2 fst-italic">El proyecto es una versión completamente personal del proyecto original diseñado en conjunto.</p>
                            <Link to={'https://github.com/Nicodc96/react-crud-medical-supplies'} target='_blank'>
                                <button className="btn btn-outline-light ms-3">Link al repositorio</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4 text-white">
                        <h4 className="fw-lighter text-center">Tecnologías utilizadas</h4>
                        <div className="rounded" id="contenedorTecnologiasUsadas">
                            <img 
                                src={reactLogo} 
                                alt="react-logo" 
                                className="logos-tecnologias"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-custom-class="blue-tooltip"
                                data-bs-title="React"
                            />
                            <img 
                                src={firebaseLogo} 
                                alt="firebase-logo" 
                                className="logos-tecnologias"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-custom-class="orange-tooltip"
                                data-bs-title="Firebase"
                            />
                            <img 
                                src={bootstrapLogo} 
                                alt="bootstrap-logo" 
                                className="logos-tecnologias"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-custom-class="purple-tooltip"
                                data-bs-title="Bootstrap"
                            />
                            <img 
                                src={jsLogo} 
                                alt="js-logo" 
                                className="logos-tecnologias"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-custom-class="yellow-tooltip"
                                data-bs-title="JavaScript"
                            />
                            <img 
                                src={nodejsLogo} 
                                alt="node-logo" 
                                className="logos-tecnologias logo-extrawidth"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-custom-class="green-tooltip"
                                data-bs-title="Node.js"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}