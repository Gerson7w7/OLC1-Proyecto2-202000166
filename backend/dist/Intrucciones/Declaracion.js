"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionSimple = exports.Declaracion = void 0;
const Instruccion_1 = require("./Instruccion");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(ids, value, linea, columna) {
        super(linea, columna);
        this.ids = ids;
        this.value = value;
    }
    ejecutar(scope) {
        for (const id in this.ids) {
            const val = this.value.ejecutar(scope);
            scope.crearVar(id, val.value, val.type, this.linea, this.columna);
        }
    }
}
exports.Declaracion = Declaracion;
class AsignacionSimple extends Instruccion_1.Instruccion {
    constructor(id, value, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.value = value;
    }
    ejecutar(scope) {
        const val = this.value.ejecutar(scope);
        scope.setValor(this.id, val.value, val.type, this.linea, this.columna);
    }
}
exports.AsignacionSimple = AsignacionSimple;
//# sourceMappingURL=Declaracion.js.map