// components/wealthChart/WealthChart.jsx
import { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch.js';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from 'recharts';
import './WealthChart.css';

const EUR = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const LEVELS = ['day', 'week', 'month', 'year'];
const LABEL  = { day: 'Día', week: 'Semana', month: 'Mes', year: 'Año' };

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="wc-tooltip">
      <p className="wc-tooltip-label">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="wc-tooltip-row" style={{ color: entry.color }}>
          <span className="wc-tooltip-name">{entry.name}</span>
          <span className="wc-tooltip-value">{EUR.format(entry.value)}</span>
        </p>
      ))}
    </div>
  );
};

const CustomLegend = (props) => {
  const { payload, visibleKeys, onClick } = props;
  return (
    <div style={{ paddingTop: 16, fontSize: 13, color: 'var(--wc-muted)', cursor: 'pointer', display: 'flex', gap: '20px' }}>
      {payload?.map((entry) => (
        <span
          key={entry.dataKey}
          onClick={() => onClick?.({ dataKey: entry.dataKey })}
          style={{
            opacity: visibleKeys[entry.dataKey] ? 1 : 0.2,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: entry.color,
            }}
          ></span>
          {entry.value}
        </span>
      ))}
    </div>
  );
};

export default function WealthChart() {
  const [level, setLevel] = useState('month');
  const [visibleKeys, setVisibleKeys] = useState({
    Financiero: true,
    Deudas: true,
    Liquidez: true,
    Inmobiliario: true,
    Patrimonio: true,
  });

  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/get-patrimonio?level=${level}`
  );

  // Reset visible keys when level changes
  useEffect(() => {
    setVisibleKeys({
      Financiero: true,
      Deudas: true,
      Liquidez: true,
      Inmobiliario: true,
      Patrimonio: true,
    });
  }, [level]);

  const handleLegendClick = (e) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [e.dataKey]: !prev[e.dataKey],
    }));
  };

  console.log('Chart data:', data);

  return (
    <div className="wc-wrapper">
      <div className="wc-header">
        <h2 className="wc-title">Evolución patrimonial</h2>
        <span className="wc-subtitle">Histórico por categoría</span>
        <div className="wc-levels">
          {LEVELS.map((l) => (
            <button
              key={l}
              className={`wc-level-btn ${level === l ? 'active' : ''}`}
              onClick={() => setLevel(l)}
            >
              {LABEL[l]}
            </button>
          ))}
        </div>
      </div>

      <div className="wc-chart-area">
        {loading && <div className="wc-state">Cargando datos…</div>}
        {error && <div className="wc-state wc-error">Error al cargar los datos</div>}
        {!loading && !error && data?.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data} margin={{ top: 10, right: 24, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--wc-grid)" vertical={false} />
              <XAxis
                dataKey="fecha"
                tick={{ fill: 'var(--wc-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  new Date(v).toLocaleDateString('es-ES', {
                    month: 'short',
                    year: level === 'year' ? 'numeric' : '2-digit',
                    ...(level === 'day' || level === 'week' ? { day: 'numeric' } : {}),
                  })
                }
              />
              <YAxis
                tickFormatter={(v) => `${v.toFixed(0)}€`}
                tick={{ fill: 'var(--wc-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={58}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--wc-cursor)' }} />
              <Legend
                content={(props) => <CustomLegend {...props} visibleKeys={visibleKeys} onClick={handleLegendClick} />}
              />
              <Brush
                dataKey="fecha"
                height={28}
                stroke="var(--wc-muted)"
                travellerWidth={10}
                travellerHeight={24}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString('es-ES', {
                    month: 'short',
                    year: level === 'year' ? 'numeric' : '2-digit',
                  })
                }
              />
              {visibleKeys.Financiero && (
                <Bar
                  dataKey="Financiero"
                  name="Financiero"
                  stackId="positive"
                  fill="var(--wc-bar-1)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
              )}    
              {visibleKeys.Deudas && (
                <Bar
                  dataKey="Deudas"
                  name="Deudas"
                  stackId="negative"
                  fill="var(--wc-bar-3)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
              )}
              {visibleKeys.Liquidez && (
                <Bar
                  dataKey="Liquidez"
                  name="Liquidez"
                  stackId="positive"
                  fill="var(--wc-bar-4)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
              )}
              {visibleKeys.Inmobiliario && (
                <Bar
                  dataKey="Inmobiliario"
                  name="Inmobiliario"
                  stackId="positive"
                  fill="var(--wc-bar-5)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
              )}
              {visibleKeys.Patrimonio && (
                <Line
                  dataKey="Patrimonio"
                  name="Patrimonio"
                  type="monotone"
                  stroke="var(--wc-line)"
                  strokeWidth={5.5}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}