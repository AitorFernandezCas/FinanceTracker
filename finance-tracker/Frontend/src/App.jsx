import Card from './components/card/card.jsx'
import Navbar from './components/navbar/navbar.jsx'

import hogarIcon from './assets/hogar.svg';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Liquidez from "./pages/Liquidez.jsx";
import Inversion from "./pages/Inversion.jsx";
import { formatEUR, formatDeltaEUR } from "./utils/formatters"
import { useFetch } from './hooks/useFetch.js';


function App() {


const ingresosCard = (
           <Card
          icon = {hogarIcon}
          titulo = "Ingresos Pasivos"
               to="/liquidez"
       items={{
              Name: "Alice",
              Age: 30,
              }}
        />
);

const ingresosPasivosCard = (
           <Card
          icon = {hogarIcon}
          titulo = "Ingresos Pasivos"
               to="/liquidez"
       items={{
              Name: "Alice",
              Age: 30,
              }}
        />
);

const { data: liquidezData, loading: loadingLiquidez, error } =
  useFetch("http://localhost:5000/api/get-liquidez");



const liquidezCard = (   
  <Card
    icon={hogarIcon}
    titulo="Ingresos Activos"
    to="/liquidez"
    items={
      loadingLiquidez || !liquidezData
        ? { Loading: "Cargando..." }
        : {
            "Total": formatEUR(liquidezData.importe_total),
            "Variación": formatDeltaEUR(liquidezData.delta_importe)
          }
    }
  />
    )

    const activosFinancierosCard = (   
    <Card
     icon = {hogarIcon}
     titulo = "Activos Financieros"
     to="/liquidez"
       items={{
              Name: "Alice",
              Age: 30,
              Country: "Spain"
              }}
      />
    )

    const deudasCard = (   
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
    )


const { data: inmobiliarioData, loading: loadingInmobiliario, errorInmobiliario } =
  useFetch("http://localhost:5000/api/get-inmobiliario");


const inmobiliarioCard = (   
  <Card
    icon={hogarIcon}
    titulo="Inmobiliario"
    to="/liquidez"
    items={
      loadingInmobiliario || !inmobiliarioData
        ? { Loading: "Cargando..." }
        : {
            "Total": formatEUR(inmobiliarioData.importe_total),
            "Variación": formatDeltaEUR(inmobiliarioData.delta_importe)
          }
    }
  />
    )

  return (
        <Routes>
          <Route
          path = '/'
          element = {
    <div className="App">
      <Navbar logo = {hogarIcon} />
      <div className = "content">
      <div className = 'container-Income'>
       {ingresosCard} {ingresosPasivosCard}

      </div>
      <div className='container-WealthBreakdown'>
            {liquidezCard} {activosFinancierosCard} {deudasCard} {inmobiliarioCard}
    </div>
      <div className='container-WealthGraph'>
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
    </div>
          }
          />
                <Route path="/liquidez" element={<Liquidez />} />
      <Route path="/inversion" element={<Inversion />} />
      </Routes>
  );
}

export default App;