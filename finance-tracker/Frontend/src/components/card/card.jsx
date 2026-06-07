import './card.css';
import { useNavigate } from "react-router-dom";

function Card({ icon, titulo, items, to }) {
  const navigate = useNavigate();

  const entries = Object.entries(items);
  const totalEntry    = entries.find(([k]) => k === 'Total');
  const variacionEntry = entries.find(([k]) => k === 'Variación');
  const otherEntries  = entries.filter(([k]) => k !== 'Total' && k !== 'Variación');

  return (
    <div className="card" onClick={() => navigate(to)}>

      <div className="card-header">
        <div className="card-icon-wrapper">
          <img src={icon} alt="" aria-hidden="true" />
        </div>
        <span className="card-title">{titulo}</span>
      </div>

      <div className="card-total">
        {totalEntry
          ? <span className="card-total-value">{totalEntry[1]}</span>
          : otherEntries.map(([k, v]) => (
              <span key={k} className="card-total-value">{v}</span>
            ))
        }
      </div>

      {variacionEntry && (
        <div className="card-footer">
          <span className="card-delta-label">Var. anual</span>
          <span className={`card-delta-value ${
            String(variacionEntry[1]).startsWith('+') ? 'positive' :
            String(variacionEntry[1]).startsWith('-') ? 'negative' : ''
          }`}>
            {variacionEntry[1]}
          </span>
        </div>
      )}

    </div>
  );
}

export default Card;