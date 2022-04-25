"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoLogico = exports.Logico = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Logico extends Expresion_1.Expresion {
    constructor(izquierda, derecha, tipo, linea, columna) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }
    ejecutar(scope) {
        // la derecha puede venir null ya que puede que se trate de NOT que solo consta de una expresion
        const valorIzquierda = this.izquierda.ejecutar(scope);
        let valorDerecha = null;
        if (this.derecha != null) {
            valorDerecha = this.derecha.ejecutar(scope);
        }
        if (valorIzquierda.type == Retorno_1.Tipo.BOOLEAN && valorDerecha == null) {
            return { value: (!valorIzquierda.value), type: Retorno_1.Tipo.BOOLEAN, output: valorIzquierda.output };
        }
        else if (valorIzquierda.type == Retorno_1.Tipo.BOOLEAN && valorDerecha.type == Retorno_1.Tipo.BOOLEAN) {
            if (this.tipo == TipoLogico.OR) {
                return { value: (valorIzquierda.value || valorDerecha.value), type: Retorno_1.Tipo.BOOLEAN, output: valorIzquierda.output + valorDerecha.output };
            }
            return { value: (valorIzquierda.value && valorDerecha.value), type: Retorno_1.Tipo.BOOLEAN, output: valorIzquierda.output + valorDerecha.output };
        }
        if (valorDerecha == null) {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "No se puede negar a nivel lógico " + valorIzquierda.value);
        }
        throw new _Error_1._Error(this.linea, this.columna, "Semántico", "No se puede comparar a nivel lógico " + valorIzquierda.value + " con " + valorDerecha.value);
    }
}
exports.Logico = Logico;
var TipoLogico;
(function (TipoLogico) {
    TipoLogico[TipoLogico["NOT"] = 0] = "NOT";
    TipoLogico[TipoLogico["AND"] = 1] = "AND";
    TipoLogico[TipoLogico["OR"] = 2] = "OR";
})(TipoLogico = exports.TipoLogico || (exports.TipoLogico = {}));
//# sourceMappingURL=Logico.js.map