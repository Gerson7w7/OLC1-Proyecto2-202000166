import React from "react";
import { useState, useEffect } from "react";
import { Graphviz } from "graphviz-react";

const ASTReport = () => {
  const [salida, setSalida] = useState("graph G{}");

  const options = {
    fit : true,
    height : 500,
    width : 1500,
    zoom : true
  }

  useEffect(() => {
    const getAST = () => {
      const url = "http://localhost:9000/ast";
      fetch(url, {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => setSalida(res.salida));
    };
    getAST();
  });

  console.log(salida);
  return (
    <div className="main">
      <div className="d-flex justify-content-around">
        <h1>ARBOL AST</h1>
      </div>
      <div className="d-flex justify-content-center">
        <Graphviz dot={salida} options = {options} />
      </div>
    </div>
  );
};

export default ASTReport;
