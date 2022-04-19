const express = require("express");
const { Scope } = require("./dist/Extra/Scope");
const cors = require("cors");
const parser = require("./interprete/Gramatica/grammar");
const { _Error } = require("./dist/Error/_Error");
const { TipoTransferencia } = require("./dist/Intrucciones/Transferencias");
const { Funcion } = require("./dist/Intrucciones/Funcion");

// variable global para la salida
let salida = "";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.post("/grammar", (req, res) => {
  const data = req.body;
  console.log("soy backend");
  const ast = parser.parse(data.data);
  console.log(ast);
  const scope = new Scope(null);

  // primera pasada: guardando todas las funciones declaradas
  for (const instr of ast) {
    try {
      if (instr instanceof Funcion) {
        instr.ejecutar(scope);
      } 
    } catch (error) {
      console.log(error);
      salida += `Error ${error.tipo}: en linea: ${error.linea}, columna: ${error.columna}. ${error.mensaje}\n`;
    }
  }

  // ejecutando todas las instrucciones
  for (const inst of ast) {
    try {
      // se ejecutarán todas las instrucciones menos las funciones, ya que ya fueron ejecutadas
      if (!(inst instanceof Funcion)) {
        // este es para el caso en que venga un array de 2 demensiones
      if (inst instanceof Array) {
        for (const inst2 of inst) {
          inst2.ejecutar(scope);
        }
      } else {
        const retorno = inst.ejecutar(scope);
        // si es diferente de nulo, miramos que nos devuelve
        if (retorno != null && retorno != undefined) {
          if (retorno.output != null) {
            salida += retorno.output;
          }
          if (retorno.transferencia != null && retorno.transferencia.type != TipoTransferencia.RETURN) {
            // si es una sentencia de transferencia, lanzamos un error semántico
            let error = new _Error(
              retorno.transferencia.linea,
              retorno.transferencia.columna,
              "Semántico",
              "No se puede utilizar la sentencia " +
                TipoTransferencia[retorno.transferencia.type] +
                " en afuera de un ciclo"
            );
            console.log(error);
            salida += `Error ${error.tipo}: en la linea: ${error.linea}, columna: ${error.columna}. ${error.mensaje}\n`;
          }
        }
      }
      }
    } catch (error) {
      console.log(error);
      salida += `Error ${error.tipo}: en linea: ${error.linea}, columna: ${error.columna}. ${error.mensaje}\n`;
    }
  }
  console.log("salida: " + salida);
  res.send({ salida: salida });
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
