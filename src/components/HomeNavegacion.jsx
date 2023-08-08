import { Link } from 'react-router-dom';
import medicLogo from '../assets/medic-logo.png';
import logoReact from '../assets/react.svg';

export const Navegacion = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme='dark'>
            <div className="container-fluid ms-5">
                <Link to='/' className='navbar-brand'>
                    <img src={medicLogo} alt='logo cac' width='35px'/>
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#containerNavButtons"
                    aria-controls="containerNavButtons">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="containerNavButtons">
                    <Link className='nav-link' to={'/'}>
                        <button type='button' className='btn'>Home</button>
                    </Link>
                    <Link className='nav-link' to={'/equipos'}>
                        <button type='button' className='btn'>Equipos</button>
                    </Link>
                </div>
                <div id="contenedorLogoReactNavbar">
                    <img src={logoReact} className='img-fluid me-5 rotation-effect' alt="logo-react" />
                </div>
            </div>
        </nav>
    )
};