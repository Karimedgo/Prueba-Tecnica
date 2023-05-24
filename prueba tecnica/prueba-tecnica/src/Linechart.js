import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartExample = ({ showChart, onToggleChart }) => {
  const [chartData, setChartData] = useState(null);
  const [dataLimit, setDataLimit] = useState(10); // Valor inicial del límite de datos

  useEffect(() => {
    if (showChart) {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5800/leer_datos');
          const jsonData = await response.json();

          const transformedData = Object.entries(jsonData["datos_puerta"]).map(([fecha, valor]) => ({
            fecha,
            valor
          }));

          // Aplicar el límite de datos usando slice
          const limitedData = transformedData.slice(0, dataLimit);

          setChartData(limitedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [showChart, dataLimit]);

  const handleDataLimitChange = (event) => {
    const limit = parseInt(event.target.value);
    setDataLimit(limit);
  };

  if (!showChart) {
    return <button onClick={onToggleChart}>Mostrar Gráfico</button>;
  }

  let transformedData = null; // Definir la variable transformedData aquí

  return (
    <div>
      <div>
        <label htmlFor="dataLimit">Límite de Datos:</label>
        <input
          type="number"
          id="dataLimit"
          value={dataLimit}
          onChange={handleDataLimitChange}
          min={1}
          max={transformedData?.length}
        />
      </div>
      {chartData ? (
        <LineChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis dataKey="valor" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valor" stroke="blue" />
        </LineChart>
      ) : (
        <p>Cargando datos...</p>
      )}
      <button onClick={onToggleChart}>Ocultar Gráfico</button>
    </div>
  );
};

export default LineChartExample;
