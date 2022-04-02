"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoLiteral = exports.Literal = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Literal extends Expresion_1.Expresion {
    constructor(value, tipo, linea, columna) {
        super(linea, columna);
        this.value = value;
        this.tipo = tipo;
    }
    ejecutar(scope) {
        if (this.tipo == TipoLiteral.ENTERO) {
            return { value: Number(this.value), type: Retorno_1.Tipo.ENTERO };
        }
        else if (this.tipo == TipoLiteral.DECIMAL) {
            return { value: Number(this.value), type: Retorno_1.Tipo.DECIMAL };
        }
        else if (this.tipo == TipoLiteral.BOOLEAN) {
            if (this.value.toString().toLowerCase() == "true") {
                return { value: true, type: Retorno_1.Tipo.BOOLEAN };
            }
            return { value: false, type: Retorno_1.Tipo.BOOLEAN };
        }
        else if (this.tipo == TipoLiteral.CARACTER) {
            return { value: this.value.toString(), type: Retorno_1.Tipo.CARACTER };
        }
        else if (this.tipo == TipoLiteral.CADENA) {
            return { value: this.value.toString(), type: Retorno_1.Tipo.CADENA };
        }
        throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Error");
    }
}
exports.Literal = Literal;
var TipoLiteral;
(function (TipoLiteral) {
    TipoLiteral[TipoLiteral["ENTERO"] = 0] = "ENTERO";
    TipoLiteral[TipoLiteral["DECIMAL"] = 1] = "DECIMAL";
    TipoLiteral[TipoLiteral["BOOLEAN"] = 2] = "BOOLEAN";
    TipoLiteral[TipoLiteral["CARACTER"] = 3] = "CARACTER";
    TipoLiteral[TipoLiteral["CADENA"] = 4] = "CADENA";
    TipoLiteral[TipoLiteral["ERROR"] = 5] = "ERROR";
})(TipoLiteral = exports.TipoLiteral || (exports.TipoLiteral = {}));
//# sourceMappingURL=Literal.js.map