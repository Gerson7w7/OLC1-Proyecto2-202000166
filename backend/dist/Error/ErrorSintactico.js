"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorSintactico = void 0;
const _Error_1 = require("./_Error");
class ErrorSintactico {
    constructor(token, linea, columna) {
        this.token = token;
        this.linea = linea;
        this.columna = columna;
        console.log("soi un error sintactico");
    }
    ejecutar(scope) {
        throw new _Error_1._Error(this.linea, this.columna, "Sintáctico", "No se esperaba el siguiente token: " + this.token);
    }
}
exports.ErrorSintactico = ErrorSintactico;
//# sourceMappingURL=ErrorSintactico.js.map