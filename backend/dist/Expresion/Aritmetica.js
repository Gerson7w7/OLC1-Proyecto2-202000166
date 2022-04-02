"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAritmetica = exports.Aritmetica = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Aritmetica extends Expresion_1.Expresion {
    constructor(izquierda, derecha, tipo, linea, columna) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }
    ejecutar(scope) {
        // valores de las expresiones 
        const valorIzquierda = this.izquierda.ejecutar(scope);
        const valorDerecha = this.derecha.ejecutar(scope);
        let dominante;
        if (this.tipo == TipoAritmetica.SUMA) {
            dominante = this.tipoDominanteSuma(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Retorno_1.Tipo.ENTERO };
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Retorno_1.Tipo.DECIMAL };
            }
            else if (dominante == Retorno_1.Tipo.CADENA) {
                return { value: (valorIzquierda.value.toString() + valorDerecha.value.toString()), type: Retorno_1.Tipo.CADENA };
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador +.");
            }
        }
        else if (this.tipo == TipoAritmetica.RESTA) {
            dominante = this.tipoDominanteResta(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                return { value: (valorIzquierda.value - valorDerecha.value), type: Retorno_1.Tipo.ENTERO };
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                return { value: (valorIzquierda.value - valorDerecha.value), type: Retorno_1.Tipo.DECIMAL };
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador -.");
            }
        }
        else if (this.tipo == TipoAritmetica.MULTIPLICACION) {
            dominante = this.tipoDominanteMultiplicacion(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                return { value: (valorIzquierda.value * valorDerecha.value), type: Retorno_1.Tipo.ENTERO };
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                return { value: (valorIzquierda.value * valorDerecha.value), type: Retorno_1.Tipo.DECIMAL };
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador *.");
            }
        }
        else if (this.tipo == TipoAritmetica.DIVISION) {
            dominante = this.tipoDominanteDivision(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                if (valorDerecha.value != 0) {
                    return { value: (valorIzquierda.value / valorDerecha.value), type: Retorno_1.Tipo.ENTERO };
                }
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Valor indeterminado. No se puede operar " + valorIzquierda.value + " entre 0.");
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                if (valorDerecha.value != 0) {
                    return { value: (valorIzquierda.value / valorDerecha.value), type: Retorno_1.Tipo.DECIMAL };
                }
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Valor indeterminado. No se puede operar " + valorIzquierda.value + " entre 0.");
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador /.");
            }
        }
        else if (this.tipo == TipoAritmetica.POTENCIA) {
            dominante = this.tipoDominantePotencia(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Retorno_1.Tipo.ENTERO };
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Retorno_1.Tipo.DECIMAL };
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador ^.");
            }
        }
        else if (this.tipo == TipoAritmetica.MODULO) {
            dominante = this.tipoDominanteModulo(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                return { value: (valorIzquierda.value % valorDerecha.value), type: Retorno_1.Tipo.ENTERO };
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                return { value: (valorIzquierda.value % valorDerecha.value), type: Retorno_1.Tipo.DECIMAL };
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador %.");
            }
        }
        throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Error");
    }
}
exports.Aritmetica = Aritmetica;
var TipoAritmetica;
(function (TipoAritmetica) {
    TipoAritmetica[TipoAritmetica["SUMA"] = 0] = "SUMA";
    TipoAritmetica[TipoAritmetica["RESTA"] = 1] = "RESTA";
    TipoAritmetica[TipoAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoAritmetica[TipoAritmetica["DIVISION"] = 3] = "DIVISION";
    TipoAritmetica[TipoAritmetica["POTENCIA"] = 4] = "POTENCIA";
    TipoAritmetica[TipoAritmetica["MODULO"] = 5] = "MODULO";
})(TipoAritmetica = exports.TipoAritmetica || (exports.TipoAritmetica = {}));
//# sourceMappingURL=Aritmetica.js.map