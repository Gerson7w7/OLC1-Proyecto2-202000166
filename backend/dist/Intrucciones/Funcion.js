"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const _Error_1 = require("../Error/_Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class Funcion extends Instruccion_1.Instruccion {
    constructor(id, parametros, tipoRetorno, bloque, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.parametros = parametros;
        this.tipoRetorno = tipoRetorno;
        this.bloque = bloque;
    }
    ejecutar(scope) {
        let tipo = 'Método';
        let tipoDato = 'VOID';
        if (this.tipoRetorno != null) {
            tipo = 'Función';
            tipoDato = this.tipoRetorno.toUpperCase();
        }
        scope.guardarFuncion(this.id, this, this.linea, this.columna, tipo, tipoDato);
        return null;
    }
    // método para validar los tipos de expresiones mandados como argumentos
    tipoArgumentos(args, scope) {
        for (let i = 0; i < args.length; i++) {
            // tipo del argumento
            const argType = args[i].ejecutar(scope).type;
            // tipo del parametro
            const paramType = this.parametros[i].type;
            let tipoParam;
            if (paramType == "int") {
                tipoParam = Retorno_1.Tipo.ENTERO;
            }
            else if (paramType == "double") {
                tipoParam = Retorno_1.Tipo.DECIMAL;
            }
            else if (paramType == "string") {
                tipoParam = Retorno_1.Tipo.CADENA;
            }
            else if (paramType == "char") {
                tipoParam = Retorno_1.Tipo.CARACTER;
            }
            else if (paramType == "boolean") {
                tipoParam = Retorno_1.Tipo.BOOLEAN;
            }
            if (argType != tipoParam) {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. Se esperaba un " + Retorno_1.Tipo[tipoParam] + " y se encontró un " + Retorno_1.Tipo[argType]);
            }
        }
    }
    // metodo para validar el tipo de dato de retorno
    tipoDato(tipo) {
        let tipoRetorno;
        if (this.tipoRetorno != null) {
            if (this.tipoRetorno == "int") {
                tipoRetorno = Retorno_1.Tipo.ENTERO;
            }
            else if (this.tipoRetorno == "double") {
                tipoRetorno = Retorno_1.Tipo.DECIMAL;
            }
            else if (this.tipoRetorno == "string") {
                tipoRetorno = Retorno_1.Tipo.CADENA;
            }
            else if (this.tipoRetorno == "char") {
                tipoRetorno = Retorno_1.Tipo.CARACTER;
            }
            else if (this.tipoRetorno == "boolean") {
                tipoRetorno = Retorno_1.Tipo.BOOLEAN;
            }
            if (tipo != tipoRetorno) {
                if (tipo == null) {
                    throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Sin retorno. Se espera que se retorne un " + Retorno_1.Tipo[tipoRetorno] + " pero no se retornó nada.");
                }
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. El retorno debería ser de tipo " + Retorno_1.Tipo[tipoRetorno] + ", pero se encontró un " + Retorno_1.Tipo[tipo]);
            }
        }
        else {
            if (tipo != null) {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Una función de tipo VOID no puede regresar un valor, se intentó devolver: " + Retorno_1.Tipo[tipo]);
            }
        }
    }
}
exports.Funcion = Funcion;
//# sourceMappingURL=Funcion.js.map