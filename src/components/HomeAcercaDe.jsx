import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import reactLogo from '../assets/react.svg';
import firebaseLogo from '../assets/firebase.svg';
import bootstrapLogo from '../assets/bootstrap.svg';
import jsLogo from '../assets/javascript.svg';
import nodejsLogo from '../assets/nodejs.svg';

export const AcercaDe = () => {
    const renderTooltip = props => (
        <Tooltip {...props}>{props.title}</Tooltip>
      );
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
                            <Link to={'https://github.com/Nicodc96/react-crud-medical-supplies'} target='_blank'>
                                <button className="btn btn-outline-light ms-3">Link al repositorio</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4 text-white">
                        <h4 className="fw-lighter text-center">Tecnologías utilizadas</h4>
                        <div className="rounded" id="contenedorTecnologiasUsadas">
                            <OverlayTrigger overlay={renderTooltip({
                                className:"blue-tooltip",
                                title: "React",
                                placement:"top"})}>
                                <img 
                                    src={reactLogo} 
                                    alt="react-logo" 
                                    className="logos-tecnologias"
                                />
                            </OverlayTrigger>
                            <OverlayTrigger overlay={renderTooltip({
                                className:"orange-tooltip",
                                title: "Firebase",
                                placement:"top"})}>
                                <img 
                                    src={firebaseLogo} 
                                    alt="firebase-logo" 
                                    className="logos-tecnologias"
                                />
                            </OverlayTrigger>
                            <OverlayTrigger overlay={renderTooltip({
                                className:"purple-tooltip",
                                title: "Bootstrap",
                                placement:"top"})}>
                                <img 
                                    src={bootstrapLogo} 
                                    alt="bootstrap-logo" 
                                    className="logos-tecnologias"
                                />
                            </OverlayTrigger>                    
                            <OverlayTrigger overlay={renderTooltip({
                                className:"yellow-tooltip",
                                title: "JavaScript",
                                placement:"top"})}>
                                <img 
                                    src={jsLogo} 
                                    alt="js-logo" 
                                    className="logos-tecnologias"
                                />
                            </OverlayTrigger>
                            <OverlayTrigger overlay={renderTooltip({
                                className:"green-tooltip",
                                title: "Node.js",
                                placement:"top"})}>
                                <img 
                                    src={nodejsLogo} 
                                    alt="node-logo" 
                                    className="logos-tecnologias logo-extrawidth"
                                />
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}