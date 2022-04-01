"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acesso = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
class Acesso extends Expresion_1.Expresion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    ejecutar(scope) {
        const value = scope.getValor(this.id, this.linea, this.columna);
        if (value != null) {
            return { value: value.valor, type: value.type };
        }
        throw new _Error_1._Error(this.linea, this.columna, 'Semántico', 'No se ha declarado la variable ' + value.id);
    }
}
exports.Acesso = Acesso;
//# sourceMappingURL=Acceso.js.map