import { HeaderText } from "./HeaderText";
import { Navegacion } from "./HomeNavegacion";

export const Header = () => {
    return (
        <>
            <Navegacion/>
            <header>
                <div id="headerCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active carousel-img-1" />
                        <div className="carousel-item carousel-img-2" />
                        <div className="carousel-item carousel-img-3" />
                    </div>
                </div>
                <article className="header-text">
                    <HeaderText />
                </article>
            </header>
        </>
    )
}