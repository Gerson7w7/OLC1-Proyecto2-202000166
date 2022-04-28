"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamadaFuncion = void 0;
const _Error_1 = require("../Error/_Error");
const Scope_1 = require("../Extra/Scope");
const Instruccion_1 = require("./Instruccion");
class LlamadaFuncion extends Instruccion_1.Instruccion {
    constructor(id, argumentos, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.argumentos = argumentos;
    }
    ejecutar(scope) {
        // obtenemos la función (si se encuentra)
        const funcion = scope.getFuncion(this.id, this.linea, this.columna);
        if (this.argumentos.length != funcion.parametros.length) {
            // si los parámetros no coinciden con la cantidad de argumentos es un error semántico
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "La cantidad de argumentos es errónea.");
        }
        // comprobamos si los argumentos que nos mandan son del tipo de los parametros
        funcion.tipoArgumentos(this.argumentos, scope);
        // obteniendo el scope global y creando el nuevo scope para la funcion
        const newScope = new Scope_1.Scope(scope.getGlobal());
        for (let i = 0; i < this.argumentos.length; i++) {
            // argumentos de la llamada a la función
            const valueArgs = this.argumentos[i].ejecutar(scope);
            let id;
            if (funcion.parametros[i].ids != undefined) {
                id = funcion.parametros[i].ids[0];
            }
            else {
                id = funcion.parametros[i].id;
            }
            newScope.crearVar(id, valueArgs.value, valueArgs.type, this.linea, this.columna);
        }
        // ejecutando las instrucciones de la función
        const valBloque = funcion.bloque.ejecutar(newScope);
        // verificando si el retorno de la función es del tipo correcto
        if (valBloque.retorno != null) {
            funcion.tipoDato(valBloque.retorno.type);
        }
        else {
            funcion.tipoDato(null);
        }
        return valBloque;
    }
}
exports.LlamadaFuncion = LlamadaFuncion;
//# sourceMappingURL=LlamadaFuncion.js.map