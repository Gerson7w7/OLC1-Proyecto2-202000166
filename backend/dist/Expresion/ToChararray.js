"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToChararray = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class ToChararray extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    ejecutar(scope) {
        // ejecutando la expresion
        const val = this.expresion.ejecutar(scope);
        if (val.type != Retorno_1.Tipo.CADENA) {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Se esperaba una CADENA y se obtuvo un " + Retorno_1.Tipo[val.type]);
        }
        // devolviendo un vector
        return { value: Array.from(val.value), type: Retorno_1.Tipo.CARACTER, output: val.output };
    }
}
exports.ToChararray = ToChararray;
//# sourceMappingURL=ToChararray.js.map