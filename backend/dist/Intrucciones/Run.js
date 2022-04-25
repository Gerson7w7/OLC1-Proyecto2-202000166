"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = void 0;
const Instruccion_1 = require("./Instruccion");
class Run extends Instruccion_1.Instruccion {
    constructor(funcion, linea, columna) {
        super(linea, columna);
        this.funcion = funcion;
    }
    ejecutar(scope) {
        return this.funcion.ejecutar(scope);
    }
}
exports.Run = Run;
//# sourceMappingURL=Run.js.map