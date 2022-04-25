import React from "react";
import { useState, useEffect } from "react";

const SimbolosReport = () => {
  const [simbolos, setSimbolos] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getErrores = () => {
      const url = "http://localhost:9000/simbolos";
      fetch(url, {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {if (isMounted) console.log(res)});
    };
    getErrores();
    return () => { isMounted = false };
  }, []);

  return (
    <div className="main">
      <div className="d-flex justify-content-around">
        <h1>TABLA DE SÍMBOLOS</h1>
      </div>
      <div className="d-flex justify-content-around">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="table-dark" scope="col">
                Identificador
              </th>
              <th className="table-primary" scope="col">
                Tipo
              </th>
              <th className="table-dark" scope="col">
                Tipo de dato
              </th>
              <th className="table-primary" scope="col">
                Entorno
              </th>
              <th className="table-dark" scope="col">
                Línea
              </th>
              <th className="table-primary" scope="col">
                Columna
              </th>
            </tr>
          </thead>
          {/* <tbody>
            {errores.map((error, index) => (
              <tr key={index}>
                <th className="table-primary" scope="row">{index + 1}</th>
                <td className="table-dark">{error.tipo}</td>
                <td className="table-primary">{error.mensaje}</td>
                <td className="table-dark">{error.linea}</td>
                <td className="table-primary">{error.columna}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default SimbolosReport