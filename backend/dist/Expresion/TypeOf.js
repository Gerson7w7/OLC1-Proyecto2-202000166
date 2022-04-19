"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOf = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class TypeOf extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    ejecutar(scope) {
        // ejecutando la expresion
        const val = this.expresion.ejecutar(scope);
        if (val.value instanceof Array) {
            return { value: "VECTOR", type: Retorno_1.Tipo.CADENA };
        }
        // devolviendo el tipo de dato
        return { value: Retorno_1.Tipo[val.type].toString(), type: Retorno_1.Tipo.CADENA };
    }
}
exports.TypeOf = TypeOf;
//# sourceMappingURL=TypeOf.js.map