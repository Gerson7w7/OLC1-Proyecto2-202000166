import React from "react";
import { useState, useEffect } from "react";

const ErroresReport = () => {
  const [errores, setErrores] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getErrores = () => {
      const url = "http://localhost:9000/errores";
      fetch(url, {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {if (isMounted) setErrores(res)});
    };
    getErrores();
    return () => { isMounted = false };
  }, []);

  return (
    <div className="main">
      <div className="d-flex justify-content-around">
        <h1>REPORTE DE ERRORES</h1>
      </div>
      <div className="d-flex justify-content-around">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="table-dark" scope="col">
                No.
              </th>
              <th className="table-primary" scope="col">
                Tipo de Error
              </th>
              <th className="table-dark" scope="col">
                Descripción
              </th>
              <th className="table-primary" scope="col">
                Línea
              </th>
              <th className="table-dark" scope="col">
                Columna
              </th>
            </tr>
          </thead>
          <tbody>
            {errores.map((error, index) => (
              <tr key={index}>
                <th className="table-primary" scope="row">{index + 1}</th>
                <td className="table-dark">{error.tipo}</td>
                <td className="table-primary">{error.mensaje}</td>
                <td className="table-dark">{error.linea}</td>
                <td className="table-primary">{error.columna}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ErroresReport;
