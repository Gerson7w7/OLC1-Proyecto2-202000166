"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfElse = void 0;
const _Error_1 = require("../Error/_Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class IfElse extends Instruccion_1.Instruccion {
    constructor(condicion, bloque, bloqueElse, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.bloque = bloque;
        this.bloqueElse = bloqueElse;
    }
    ejecutar(scope) {
        // ejecutamos y obtenemos el valor de la condición
        const valueCondicion = this.condicion.ejecutar(scope);
        // verificamos que se trate de un boolean, sino lanzamos un error
        if (valueCondicion.type != Retorno_1.Tipo.BOOLEAN) {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "La condición a evaluar tiene que retornar BOOLEAN, y se obtuvo " + Retorno_1.Tipo[valueCondicion.type]);
        }
        // evaluamos si es true o false
        if (valueCondicion.value) {
            return this.bloque.ejecutar(scope);
        }
        else if (this.bloqueElse != null) {
            // se ejecutará en los casos que vengan un else o tantos else if como hayan 
            return this.bloqueElse.ejecutar(scope);
        }
    }
}
exports.IfElse = IfElse;
//# sourceMappingURL=IfElse.js.map