import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Equip } from './components/Equip';
import { Show } from './components/Show';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { Navegacion } from './components/HomeNavegacion';
import { HeaderText } from './components/HeaderText';
import logoCaC1 from './assets/logoCaC1.png';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navegacion/>
        <header>
          <div id="headerCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active carousel-img-1" />
              <div className="carousel-item carousel-img-2" />
              <div className="carousel-item carousel-img-3" />
            </div>
          </div>
          <article className='header-text'>
            <HeaderText />
            <p className='fw-semibold fst-italic text-white-50'>Codo a Codo ~ 2023</p>
          </article>
        </header>
        <main>
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/equipos" element={ <Show /> }/>
          <Route path="/create" element={ <Create /> }/>
          <Route path="/edit/:equipmentId" element={ <Edit /> }/>
          <Route path="/equipos/:nombre" element={ <Equip /> }/>
        </Routes>
        </main>
        <footer className='bg-dark'>
          <div className='d-flex justify-content-between me-4 mx-4'>
            <div className='d-flex gap-2 flex-row'>
              <img 
                src={logoCaC1}
                alt="logo cac"
                width='75px'
                className='pt-2'
              />
              <p className='mb-0 text-white-50 fst-italic pt-3 txtFooterCaC'>Codo a Codo ~ React</p>
            </div>
            <p className='mb-0 text-white-50 pt-3 txtFooterCaC'>Nicolás Díaz - CaC React &copy; 2023</p>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
