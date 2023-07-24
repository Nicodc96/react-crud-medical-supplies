import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Equip } from './components/Equip';
import { Show } from './components/Show';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { Navegacion } from './components/Navegacion';
import logoCaC1 from './assets/logoCaC1.png';
import reactLogo from './assets/react-logo.png'
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navegacion/>
        <header>
          <div className='d-flex justify-content-center'>
            <img src={reactLogo} alt="react logo" id="header-logo"/>
          </div>
          <article className='header-text'>
            <h1 className='fst-italic'>Equipamiento Médico</h1>
            <p className='fw-semibold fst-italic'>Codo a Codo ~ 2023</p>
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
          <div className='d-flex justify-content-between'>
            <div className='d-flex gap-2 flex-row'>
              <img 
                src={logoCaC1}
                alt="logo cac"
                width='75px'
                className='pt-2'
              />
              <p className='mb-0 fs-4 text-white-50 fst-italic pt-2 txtFooterCaC'>Codo a Codo ~ React</p>
            </div>
            <p className='mb-0 text-white-50 pt-3 txtFooterCaC'>Nicolás Díaz ~ CaC React &copy; 2023</p>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
