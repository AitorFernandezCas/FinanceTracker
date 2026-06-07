import Navbar from '../../components/navbar/navbar.jsx';
import hogarIcon from '../../assets/hogar.svg';

function activosFinancieros() {
  return    <div className="App">
            <Navbar logo={hogarIcon} />
                        <div className="content">
                            <h1>Activos Financieros</h1>
                        </div>
            </div>;
}

export default activosFinancieros;