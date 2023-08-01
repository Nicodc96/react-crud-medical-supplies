import logoCaCFooter from '../assets/logoCaC1.png';

export const Footer = () => {
    return (
        <>
            <footer className="bg-dark">
                <div className="d-flex justify-content-between me-4 mx-4" id="contenedorFooter">
                    <div className="d-flex gap-2 flex-row" id="contenedorLogoTextoFooter">
                        <img src={logoCaCFooter} alt="logo cac" width="75px" className="pt-2"/>
                        <p className="mb-0 text-white-50 fst-italic pt-3 txtFooterCaC">Codo a Codo ~ React</p>
                    </div>
                    <p className="mb-0 text-white-50 pt-3 txtFooterCaC">Nicolás Díaz &copy; 2023</p>
                </div>
            </footer>
        </>
    )
}