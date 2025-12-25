import Card from './components/card/card.jsx'
import Navbar from './components/navbar/navbar.jsx'

import hogarIcon from './assets/hogar.svg';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Liquidez from "./pages/Liquidez.jsx";
import Inversion from "./pages/Inversion.jsx";

function App() {
  return (
        <Routes>
          <Route
          path = '/'
          element = {
    <div className="App">
      <><Navbar /></>
      <div className='container-AssetSelection'>
     <Card
     icon = {hogarIcon}
     titulo = "Liquidez"
     to="/liquidez"
       items={{
              Name: "Alice",
              Age: 30,
              Country: "Spain"
              }}
      />
           <Card
     icon = {hogarIcon}
     titulo = "Inversiones"
     to="/liquidez"
       items={{
              Name: "Alice",
              Age: 30,
              Country: "Spain"
              }}
      />
           <Card
     icon = {hogarIcon}
     titulo = "Deudas"
     to="/liquidez"
       items={{
              Name: "Alice",
              Age: 30,
              Country: "Spain"
              }}
      />
           <Card
     icon = {hogarIcon}
     titulo = "Inmobiliario"
     to="/liquidez"
       items={{
              Name: "Alice",
              Age: 30,
              Country: "Spain"
              }}
      />
    </div>
    </div>
          }
          />
                <Route path="/liquidez" element={<Liquidez />} />
      <Route path="/inversion" element={<Inversion />} />
      </Routes>
  );
}

export default App;