"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Casteo extends Expresion_1.Expresion {
    constructor(tipo, expresion, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.expresion = expresion;
    }
    ejecutar(scope) {
        // valor de la expresion 
        const valorExpresion = this.expresion.ejecutar(scope);
        if (valorExpresion.type == Retorno_1.Tipo.ENTERO && this.tipo == 'double') {
            return { value: valorExpresion.value.toFixed(1), type: Retorno_1.Tipo.DECIMAL };
        }
        else if (valorExpresion.type == Retorno_1.Tipo.DECIMAL && this.tipo == 'int') {
            return { value: parseInt(valorExpresion.value, 10), type: Retorno_1.Tipo.ENTERO };
        }
        else if (valorExpresion.type == Retorno_1.Tipo.ENTERO && this.tipo == 'char') {
            return { value: String.fromCharCode(valorExpresion.value), type: Retorno_1.Tipo.CARACTER };
        }
        else if (valorExpresion.type == Retorno_1.Tipo.CARACTER && this.tipo == 'int') {
            return { value: valorExpresion.value.charCodeAt(0), type: Retorno_1.Tipo.ENTERO };
        }
        else if (valorExpresion.type == Retorno_1.Tipo.CARACTER && this.tipo == 'double') {
            return { value: valorExpresion.value.charCodeAt(0).toFixed(1), type: Retorno_1.Tipo.DECIMAL };
        }
        throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Error de casteo. No es posible pasar de " + Retorno_1.Tipo[valorExpresion.type] + " a " + this.tipo.toUpperCase());
    }
}
exports.Casteo = Casteo;
//# sourceMappingURL=Casteo.js.map