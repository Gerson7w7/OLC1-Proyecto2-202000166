"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncrementoDecremento = void 0;
const _Error_1 = require("../Error/_Error");
const Aritmetica_1 = require("./Aritmetica");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class IncrementoDecremento extends Expresion_1.Expresion {
    constructor(expresion, tipo, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.tipo = tipo;
    }
    ejecutar(scope) {
        // valor de la expresion 
        const valorExpresion = this.expresion.ejecutar(scope);
        let valueDespues;
        if (this.tipo == Aritmetica_1.TipoAritmetica.SUMA) {
            if (valorExpresion.type == Retorno_1.Tipo.ENTERO || valorExpresion.type == Retorno_1.Tipo.DECIMAL) {
                scope.setValor(this.expresion.id, valorExpresion.value + 1, valorExpresion.type, this.linea, this.columna);
                return { value: valorExpresion.value, type: valorExpresion.type };
            }
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "No se puede incrementar el siguiente valor: " + valorExpresion.value);
        }
        else {
            if (valorExpresion.type == Retorno_1.Tipo.ENTERO || valorExpresion.type == Retorno_1.Tipo.DECIMAL) {
                scope.setValor(this.expresion.id, valorExpresion.value - 1, valorExpresion.type, this.linea, this.columna);
                return { value: valorExpresion.value, type: valorExpresion.type };
            }
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "No se puede decrementar el siguiente valor: " + valorExpresion.value);
        }
    }
}
exports.IncrementoDecremento = IncrementoDecremento;
//# sourceMappingURL=IncrementoDecremento.js.map