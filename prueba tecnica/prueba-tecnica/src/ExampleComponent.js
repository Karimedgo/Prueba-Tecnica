import React, { useState } from 'react';

const ExampleComponent = () => {
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');

  const handleInputChange = (e, setInputValue) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5800/nuevo_estado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "estado_puerta": input1Value,
          "estado_termometro": input2Value,
        }),
      });

      // Handle response
      // ...
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input1Value}
        onChange={(e) => handleInputChange(e, setInput1Value)}
      />
      <input
        type="text"
        value={input2Value}
        onChange={(e) => handleInputChange(e, setInput2Value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ExampleComponent;
