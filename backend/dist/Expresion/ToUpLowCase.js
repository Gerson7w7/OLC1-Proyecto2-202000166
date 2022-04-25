"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLowerCase = exports.ToUpperCase = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("../Expresion/Expresion");
const Retorno_1 = require("../Expresion/Retorno");
// estas clases estarán en las expresiones ya que devuelve una expresion
class ToUpperCase extends Expresion_1.Expresion {
    constructor(cadena, linea, columna) {
        super(linea, columna);
        this.cadena = cadena;
    }
    ejecutar(scope) {
        // ejecutamos la expresion
        const value = this.cadena.ejecutar(scope);
        if (value.type != Retorno_1.Tipo.CADENA) {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Se esperaba una CADENA y se obtuvo un " + Retorno_1.Tipo[value.type]);
        }
        return { value: value.value.toUpperCase(), type: Retorno_1.Tipo.CADENA, output: value.output };
    }
}
exports.ToUpperCase = ToUpperCase;
class ToLowerCase extends Expresion_1.Expresion {
    constructor(cadena, linea, columna) {
        super(linea, columna);
        this.cadena = cadena;
    }
    ejecutar(scope) {
        // ejecutamos la expresion
        const value = this.cadena.ejecutar(scope);
        if (value.type != Retorno_1.Tipo.CADENA) {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Se esperaba una CADENA y se obtuvo un " + Retorno_1.Tipo[value.type]);
        }
        return { value: value.value.toLowerCase(), type: Retorno_1.Tipo.CADENA, output: value.output };
    }
}
exports.ToLowerCase = ToLowerCase;
//# sourceMappingURL=ToUpLowCase.js.map