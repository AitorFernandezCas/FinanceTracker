import './navbar.css';
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const navigate = useNavigate();

  return (<div className='navbar'>
    <img src={props.logo} alt="Logo" className='navbar-logo' />
  </div>);
}

export default Navbar;