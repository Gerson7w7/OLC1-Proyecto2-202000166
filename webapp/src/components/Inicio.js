import Editor from "@monaco-editor/react";
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const editorRef = useRef(null);
  const [salida, setSalida] = useState("");
  const [nombre, setNombre] = useState("");
  let navigate = useNavigate();

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    const url = "http://localhost:9000/grammar";
    const data = { data: editorRef.current.getValue().toLowerCase() };
    console.log(data);

    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((res) => setSalida(res.salida));
  }

  function crear() {
    editorRef.current.setValue("// empieza a escribir tu código...");
  }

  const abrir = (file) => {
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      const content = fileReader.result;
      editorRef.current.setValue(content);
    };
    fileReader.readAsText(file);
  };

  const saveFile = async (blob) => {
    const a = document.createElement("a");
    a.download = nombre + ".cst";
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  return (
    <div className="main">
      <div className="d-flex justify-content-around">
        <h1>COMPSCRIPT</h1>
      </div>
      <div>
        <Editor
          className="d-flex justify-content-around"
          height="72vh"
          theme="vs-dark"
          defaultLanguage="java"
          defaultValue="// empieza a escribir tu código..."
          onMount={handleEditorDidMount}
        />
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Abrir
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Abrir archivo
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <input
                        accept=".cst"
                        onChange={(e) => abrir(e.target.files[0])}
                        className="form-control"
                        type="file"
                        id="file"
                      ></input>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={crear} type="button" className="btn btn-primary">
              Crear
            </button>

            <button
              type="button"
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
            >
              Guardar
            </button>
            <div
              className="modal fade"
              id="exampleModal2"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Guardar archivo
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Nombre del archivo"
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() =>
                        saveFile(
                          new Blob(
                            [
                              JSON.stringify(
                                editorRef.current.getValue(),
                                null,
                                2
                              ),
                            ],
                            { type: "application/json" }
                          )
                        )
                      }
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              href="#inicio"
            >
              Reportes
            </a>
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => {
                navigate("/errores");
              }} >
                Errores
              </button>
              <button className="dropdown-item" href="#inicio" onClick={() => {
                navigate("/AST");
              }}>
                Árbol AST
              </button>
              <button className="dropdown-item" href="#inicio" onClick={() => {
                navigate("/simbolos");
              }}>
                Tabla de Símbolos
              </button>
            </div>
          </div>
          <button onClick={showValue} type="button" className="btn btn-light">
            Ejecutar
          </button>
        </div>
      </div>
      <label className="form-label mt-4">
        <h5>Salida</h5>
      </label>
      <div className="d-flex justify-content-around">
        <textarea
          className="form-control"
          id="terminal"
          rows="10"
          value={salida}
          disabled
        ></textarea>
      </div>
    </div>
  );
};

export default Inicio;
