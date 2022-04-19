"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Round extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    ejecutar(scope) {
        // ejecutamos la expresion
        const val = this.expresion.ejecutar(scope);
        if (val.type != Retorno_1.Tipo.DECIMAL) {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Se esperaba un DECIMAL y se obtuvo un " + Retorno_1.Tipo[val.type]);
        }
        return { value: Math.round(val.value), type: Retorno_1.Tipo.ENTERO };
    }
}
exports.Round = Round;
//# sourceMappingURL=Round.js.map