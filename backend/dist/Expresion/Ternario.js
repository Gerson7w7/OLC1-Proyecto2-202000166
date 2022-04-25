"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Ternario extends Expresion_1.Expresion {
    constructor(relacion, case1, case2, linea, columna) {
        super(linea, columna);
        this.relacion = relacion;
        this.case1 = case1;
        this.case2 = case2;
    }
    ejecutar(scope) {
        // valor de la condicion (true or false) 
        const valorCondicion = this.relacion.ejecutar(scope);
        // valor de los cases
        const valorCase1 = this.case1.ejecutar(scope);
        const valorCase2 = this.case2.ejecutar(scope);
        if (valorCondicion.type == Retorno_1.Tipo.BOOLEAN) {
            if (valorCondicion.value == true) {
                return { value: valorCase1.value, type: valorCase1.type, output: valorCase1.output };
            }
            else {
                return { value: valorCase2.value, type: valorCase2.type, output: valorCase2.output };
            }
        }
        throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Se esperaba un " + Retorno_1.Tipo[Retorno_1.Tipo.BOOLEAN] + " como condición, y se encontró un " + Retorno_1.Tipo[valorCondicion.type]);
    }
}
exports.Ternario = Ternario;
//# sourceMappingURL=Ternario.js.map