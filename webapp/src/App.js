import Editor from "@monaco-editor/react";
import "./App.css";
import React, { useRef } from "react";
import { useState } from "react";

function App() {
  const editorRef = useRef(null);
  const [salida, setSalida] = useState("");

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    const url = "http://localhost:9000/grammar";
    const data = {"data": editorRef.current.getValue().toLowerCase()}
    console.log(data);

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(res => setSalida(res.salida));
  }

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
            <button type="button" className="btn btn-warning">
              Abrir
            </button>
            <button type="button" className="btn btn-primary">
              Crear
            </button>
            <button type="button" className="btn btn-success">
              Guardar
            </button>
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
          value={ salida }
          disabled
        ></textarea>
      </div>
    </div>
  );
}

export default App;
