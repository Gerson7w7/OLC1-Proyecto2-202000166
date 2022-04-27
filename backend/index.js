const express = require("express");
const { Scope } = require("./dist/Extra/Scope");
const cors = require("cors");
const parser = require("./interprete/Gramatica/grammar");
const ASTparser = require("./interprete/Gramatica/ast");
const { _Error } = require("./dist/Error/_Error");
const { TipoTransferencia } = require("./dist/Intrucciones/Transferencias");
const { Funcion } = require("./dist/Intrucciones/Funcion");
const { ArbolAST } = require("./dist/Extra/ArbolAST");
const { LlamadaFuncion } = require("./dist/Intrucciones/LlamadaFuncion");

// lista de errores
let lista_errores = [], lista_simbolos = [];
let strast = 'graph G{"No se ha podido graficar el árbol."}';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.post("/grammar", (req, res) => {
  // limpiando la lista de errores
  lista_errores = [];
  const data = req.body;
  console.log("soy backend");
  let salida = "";
  let sinErrores = true;
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
      sinErrores = false;
      lista_errores.push(error);
      salida += `Error ${error.tipo}: en linea: ${error.linea}, columna: ${error.columna}. ${error.mensaje}\n`;
    }
  }

  // ejecutando todas las instrucciones
  for (const inst of ast) {
    try {
      // se ejecutarán todas las instrucciones menos las funciones, ya que ya fueron ejecutadas
      if (!(inst instanceof Funcion)) {
        // este es para el caso en que venga un array de 2 demensiones
        if (inst instanceof _Error) {
          sinErrores = false;
          lista_errores.push(inst);
          salida += `Error ${inst.tipo}: en linea: ${inst.linea}, columna: ${inst.columna}. ${inst.mensaje}\n`;
        } else if (inst instanceof Array) {
          for (const inst2 of inst) {
            inst2.ejecutar(scope);
          }
        } else if (inst instanceof LlamadaFuncion) {
          // si es una sentencia de transferencia, lanzamos un error semántico
          throw new _Error(
            inst.linea,
            inst.columna,
            "Semántico",
            "Solo se puede ejecutar una función con la instrucción RUN en el ámbito global."
          );
        } else {
          const retorno = inst.ejecutar(scope);
          // si es diferente de nulo, miramos que nos devuelve
          if (retorno != null && retorno != undefined) {
            if (retorno.output != null) {
              if (sinErrores) {
                // aki concatenamos la salida de los prints
                salida += retorno.output;
              }
            }
            if (
              retorno.transferencia != null &&
              retorno.transferencia.type != TipoTransferencia.RETURN
            ) {
              // si es una sentencia de transferencia, lanzamos un error semántico
              throw new _Error(
                retorno.transferencia.linea,
                retorno.transferencia.columna,
                "Semántico",
                "No se puede utilizar la sentencia " +
                  TipoTransferencia[retorno.transferencia.type] +
                  " en afuera de un ciclo"
              );
            }
          }
        }
      }
    } catch (error) {
      sinErrores = false;
      if (error.output != undefined && error.output != null) {
        lista_errores = lista_errores.concat(error.errores);
        salida += error.output;
      } else {
        lista_errores.push(error);
        salida += `Error ${error.tipo}: en linea: ${error.linea}, columna: ${error.columna}. ${error.mensaje}\n`;
      }
    }
  }

  if (sinErrores) {
    strast = "digraph G{";
    const raiz = new ArbolAST();
    strast += raiz.recorrerArbol(ASTparser.parse(data.data));
    strast += "}";
  }

  console.log("salida: " + salida);
  res.send({ salida: salida });
});

function getSimbolos(simbolo) {
  lista_simbolos.push(simbolo);
}

app.get("/errores", (req, res) => {
  console.log("soi errores backend");
  res.json(lista_errores);
});

app.get("/ast", (req, res) => {
  console.log("soi ast backend");
  res.send({ salida: strast });
});

app.get("/simbolos", (req, res) => {
  console.log("soi simbolos backend");
  res.send({ salida: strast });
});

const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
