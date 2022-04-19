"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToString = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class ToString extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    ejecutar(scope) {
        // ejecutando la expresion
        const val = this.expresion.ejecutar(scope);
        if (val.type != Retorno_1.Tipo.ENTERO && val.type != Retorno_1.Tipo.DECIMAL && val.type != Retorno_1.Tipo.BOOLEAN) {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Se esperaba un ENTERO, DECIMAL o BOOLEAN y se obtuvo un " + Retorno_1.Tipo[val.type]);
        }
        // devolviendo un string
        return { value: val.value.toString(), type: Retorno_1.Tipo.CADENA };
    }
}
exports.ToString = ToString;
//# sourceMappingURL=ToString.js.map