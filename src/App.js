import React, { useState } from "react";
import Calculator from "./components/Calculator";
import History from "./components/History";
import "./App.css";

export const HamburgerContext = React.createContext();

const App = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const changeHamberburgerState = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <HamburgerContext.Provider value={{ changeHamberburgerState }}>
      <div className="calculator-container">
        {/* {!hamburgerOpen ? <Calculator /> : <History />} */}
        <Calculator />
        <History />
      </div>
    </HamburgerContext.Provider>
  );
};

export default App;
