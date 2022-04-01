"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRelacional = exports.Literal = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Literal extends Expresion_1.Expresion {
    constructor(izquierda, derecha, tipo, linea, columna) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }
    ejecutar(scope) {
        const valorIzquierda = this.izquierda.ejecutar(scope);
        const valorDerecha = this.derecha.ejecutar(scope);
        let permitido = false;
        if (valorIzquierda.type == Retorno_1.Tipo.ENTERO && valorDerecha.type == Retorno_1.Tipo.ENTERO) {
            permitido = true;
        }
        else if (valorIzquierda.type == Retorno_1.Tipo.ENTERO && valorDerecha.type == Retorno_1.Tipo.DECIMAL) {
            permitido = true;
        }
        else if (valorIzquierda.type == Retorno_1.Tipo.ENTERO && valorDerecha.type == Retorno_1.Tipo.CARACTER) {
            permitido = true;
        }
        else if (valorIzquierda.type == Retorno_1.Tipo.DECIMAL && valorDerecha.type == Retorno_1.Tipo.ENTERO) {
            permitido = true;
        }
        else if (valorIzquierda.type == Retorno_1.Tipo.DECIMAL && valorDerecha.type == Retorno_1.Tipo.CARACTER) {
            permitido = true;
        }
        else if (valorIzquierda.type == Retorno_1.Tipo.CARACTER && valorDerecha.type == Retorno_1.Tipo.ENTERO) {
            permitido = true;
        }
        else if (valorIzquierda.type == Retorno_1.Tipo.CARACTER && valorDerecha.type == Retorno_1.Tipo.CARACTER) {
            permitido = true;
        }
        if (this.tipo == TipoRelacional.IGUAL && permitido == true) {
            return { value: (valorIzquierda.value == valorDerecha.value), type: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.DESIGUAL && permitido == true) {
            return { value: (valorIzquierda.value != valorDerecha.value), type: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MENOR && permitido == true) {
            return { value: (valorIzquierda.value < valorDerecha.value), type: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MENOR_IGUAL && permitido == true) {
            return { value: (valorIzquierda.value <= valorDerecha.value), type: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MAYOR && permitido == true) {
            return { value: (valorIzquierda.value > valorDerecha.value), type: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MAYOR_IGUAL && permitido == true) {
            return { value: (valorIzquierda.value >= valorDerecha.value), type: Retorno_1.Tipo.BOOLEAN };
        }
        throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Error");
    }
}
exports.Literal = Literal;
var TipoRelacional;
(function (TipoRelacional) {
    TipoRelacional[TipoRelacional["IGUAL"] = 0] = "IGUAL";
    TipoRelacional[TipoRelacional["DESIGUAL"] = 1] = "DESIGUAL";
    TipoRelacional[TipoRelacional["MENOR"] = 2] = "MENOR";
    TipoRelacional[TipoRelacional["MENOR_IGUAL"] = 3] = "MENOR_IGUAL";
    TipoRelacional[TipoRelacional["MAYOR"] = 4] = "MAYOR";
    TipoRelacional[TipoRelacional["MAYOR_IGUAL"] = 5] = "MAYOR_IGUAL";
})(TipoRelacional = exports.TipoRelacional || (exports.TipoRelacional = {}));
//# sourceMappingURL=Relacional.js.map