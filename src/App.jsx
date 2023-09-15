import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Equip } from './components/Equip';
import { Show } from './components/Show';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
      <BrowserRouter>  
        <Header />
        <main>
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/equipos" element={ <Show /> }/>
          <Route path="/create" element={ <Create /> }/>
          <Route path="/edit/:equipmentId" element={ <Edit /> }/>
          <Route path="/equipos/:nombre" element={ <Equip /> }/>
        </Routes>
        </main>
        <Footer />
      </BrowserRouter>
  );
}

export default App;