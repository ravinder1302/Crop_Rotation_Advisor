import React, { useState } from "react";
import InputForm from "./components/InputForm";
import Results from "./components/Results";

const App = () => {
  const [predictions, setPredictions] = useState([]);

  return (
    <div>
      <h1>Crop Prediction System</h1>
      <InputForm setPredictions={setPredictions} />
      <Results predictions={predictions} />
    </div>
  );
};

export default App;
