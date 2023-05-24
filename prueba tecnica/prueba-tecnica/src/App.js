import React, { useEffect, useState } from 'react';
import ExampleComponent from './ExampleComponent';
import LineChartExample from './Linechart';
import LineChartExample1 from './LineChart1';
import './App.css'


function Imagenes({ data }) {
  const [showChart, setShowChart] = useState(false);

  const handleToggleChart = () => {
      setShowChart(!showChart);
    };
  const [showChart1, setShowChart1] = useState(false);

  const handleToggleChart1 = () => {
      setShowChart1(!showChart1);
      console.log("se ejecuto")
    };
  const puertaSrc = data && data["estado de puerta"] === 1 ? '/abierta.png' : '/cerrada.png';
  const termometroSrc = data && data["estado de termometro"] === 1 ? '/caliente.png' : '/frio.png';

return (
<div>
<img src={puertaSrc} onClick={handleToggleChart} alt="Imagen Puerta" />
<img src={termometroSrc} onClick={handleToggleChart1} alt="Imagen Termómetro" /> 
{showChart1 && <LineChartExample1 showChart1={showChart1} onToggleChart1={handleToggleChart1} />}
{showChart && <LineChartExample showChart={showChart} onToggleChart={handleToggleChart} />}
</div>
);
}






const App = () => {
const [data, setData] = useState(null);



useEffect(() => {
const fetchData = async () => {
try {
const response = await fetch('http://127.0.0.1:5800/leer');
const jsonData = await response.json();
setData(jsonData);
} catch (error) {
console.error('Error fetching data:', error);
}
};

fetchData();

const interval = setInterval(fetchData, 1000);

return () => clearInterval(interval);
}, []);

return (
<div>
<h1>Hola Mundo</h1>
<ExampleComponent/>
<Imagenes data={data} />


{data ? (
<div>
<h2>Data:</h2>
<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
) : (
<p>Loading data...</p>
)}

</div>
);
};

export default App;