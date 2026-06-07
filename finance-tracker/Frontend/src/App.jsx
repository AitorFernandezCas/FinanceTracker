import Card from './components/card/card.jsx'
import Navbar from './components/navbar/navbar.jsx'
import WealthChart from './components/wealthChart/WealthChart.jsx'

import hogarIcon from './assets/hogar.svg';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Liquidez from "./pages/Liquidez/Liquidez.jsx";
import ActivosFinancieros from "./pages/Activos Financieros/Activos Financieros.jsx";
import { formatEUR, formatDeltaEUR } from "./utils/formatters"
import { useFetch } from './hooks/useFetch.js';


function App() {



  const { data: ingresosActivosData, loading: loadingIngresosActivos } =
    useFetch("http://localhost:5000/api/get-ingresos-activos");

  const ingresosActivosCard = (
    <Card
      icon={hogarIcon}
      titulo="Ingresos Activos"
      to="/liquidez"
      items={
        loadingIngresosActivos || !ingresosActivosData
          ? { Loading: "Cargando..." }
          : {
              "Total": formatEUR(ingresosActivosData.importe_total),
              "Variación": formatDeltaEUR(ingresosActivosData.delta_importe || 0),
            }
      }
    />
  );


  const { data: ingresosPasivosData, loading: loadingIngresosPasivos } =
    useFetch("http://localhost:5000/api/get-ingresos-pasivos");

  const ingresosPasivosCard = (
    <Card
      icon={hogarIcon}
      titulo="Ingresos Pasivos"
      to="/liquidez"
      items={
        loadingIngresosPasivos || !ingresosPasivosData
          ? { Loading: "Cargando..." }
          : {
              "Total": formatEUR(ingresosPasivosData.importe_total),
              "Variación": formatDeltaEUR(ingresosPasivosData.delta_importe || 0),
            }
      }
    />
  );

  const { data: liquidezData, loading: loadingLiquidez } =
    useFetch("http://localhost:5000/api/get-liquidez");

  const liquidezCard = (
    <Card
      icon={hogarIcon}
      titulo="Liquidez"
      to="/liquidez"
      items={
        loadingLiquidez || !liquidezData
          ? { Loading: "Cargando..." }
          : {
              "Total": formatEUR(liquidezData.importe_total),
              "Variación": formatDeltaEUR(liquidezData.delta_importe),
            }
      }
    />
  );

  const { data: financieroData, loading: loadingFinanciero } =
    useFetch("http://localhost:5000/api/get-financiero");

  const activosFinancierosCard = (
    <Card
      icon={hogarIcon}
      titulo="Inversiones"
      to="/activos-financieros"
      items={
        loadingFinanciero || !financieroData
          ? { Loading: "Cargando..." }
          : { "Total": formatEUR(financieroData.valor_efectivo) }
      }
    />
  );

  const { data: deudasData, loading: loadingDeudas } =
    useFetch("http://localhost:5000/api/get-deudas");

  const deudasCard = (
    <Card
      icon={hogarIcon}
      titulo="Deudas"
      to="/liquidez"
      items={
        loadingDeudas || !deudasData
          ? { Loading: "Cargando..." }
          : {
              "Total": formatEUR(deudasData.importe_total),
              "Variación": formatDeltaEUR(deudasData.delta_importe),
            }
      }
    />
  );

  const { data: inmobiliarioData, loading: loadingInmobiliario } =
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
              "Variación": formatDeltaEUR(inmobiliarioData.delta_importe),
            }
      }
    />
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <Navbar logo={hogarIcon} />
            <div className="content">

              <div className="container-Income">
                {ingresosActivosCard} {ingresosPasivosCard}
              </div>

              <div className="container-WealthBreakdown">
                {liquidezCard} {activosFinancierosCard} {deudasCard} {inmobiliarioCard}
              </div>

              <div className="container-WealthGraph">
                <WealthChart />
              </div>

            </div>
          </div>
        }
      />
      <Route path="/liquidez" element={<Liquidez />} />
      <Route path="/activos-financieros" element={<ActivosFinancieros/>} />
    </Routes>
  );
}

export default App;