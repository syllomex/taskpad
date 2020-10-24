import React from "react";
import template from "./assets/images/template.png";

import "./app.css";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: `url(${template})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPositionY: "center",
        backgroundColor: "#282C34",
      }}
    ></div>
  );
}

export default App;
