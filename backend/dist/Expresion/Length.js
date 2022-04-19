"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Length extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    ejecutar(scope) {
        // ejecutando la expresion
        const val = this.expresion.ejecutar(scope);
        if (!(val.value instanceof Array) && val.type != Retorno_1.Tipo.CADENA) {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Se esperaba un VECTOR, LISTA o CADENA y se obtuvo un " + Retorno_1.Tipo[val.type]);
        }
        return { value: val.value.length, type: Retorno_1.Tipo.ENTERO };
    }
}
exports.Length = Length;
//# sourceMappingURL=Length.js.map