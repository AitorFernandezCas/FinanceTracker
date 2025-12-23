import './card.css';
import { useNavigate } from "react-router-dom";

function Card(props) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(props.to)}>
      <img src = {props.icon} alt={props.titulo} />
      <div>       
         <p>{props.titulo}</p>
      <ul>
        {Object.entries(props.items).map(([key, value]) => (
          <li key={key}>
            <strong>{key}</strong>: {value}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}


export default Card