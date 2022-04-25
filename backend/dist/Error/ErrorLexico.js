"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLexico = void 0;
const _Error_1 = require("./_Error");
class ErrorLexico {
    constructor(token, linea, columna) {
        this.token = token;
        this.linea = linea;
        this.columna = columna;
        console.log("soi un error lexico");
    }
    ejecutar(scope) {
        throw new _Error_1._Error(this.linea, this.columna, "Léxico", "No se reconoce el siguiente token: " + this.token);
    }
}
exports.ErrorLexico = ErrorLexico;
//# sourceMappingURL=ErrorLexico.js.map