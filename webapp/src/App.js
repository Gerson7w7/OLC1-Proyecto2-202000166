import Editor from "@monaco-editor/react";
import "./App.css";
import React, { useRef } from "react";

function App() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    console.log(editorRef.current.getValue());
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
          defaultLanguage="javascript"
          defaultValue="// empieza a escribir tu código..."
          onMount={handleEditorDidMount}
        />
        <div class="d-flex justify-content-between">
          <div className="d-flex justify-content-end">
            <button type="button" class="btn btn-warning">
              Abrir
            </button>
            <button type="button" class="btn btn-primary">
              Crear
            </button>
            <button type="button" class="btn btn-success">
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
          disabled
        ></textarea>
      </div>
    </div>
  );
}

export default App;
