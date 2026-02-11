export const formatEUR = (value) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);


  export const formatDeltaEUR = (value) => {
  const formatted = formatEUR(Math.abs(value));
  return value >= 0 ? `+${formatted}` : `-${formatted}`;
};