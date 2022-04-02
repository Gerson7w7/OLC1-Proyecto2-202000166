"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionSimple = exports.Declaracion = void 0;
const _Error_1 = require("../Error/_Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(type, ids, value, linea, columna) {
        super(linea, columna);
        this.type = type;
        this.ids = ids;
        this.value = value;
    }
    ejecutar(scope) {
        console.log("tipo: " + this.type);
        let tipo;
        if (this.type == "int") {
            tipo = Retorno_1.Tipo.ENTERO;
        }
        else if (this.type == "double") {
            tipo = Retorno_1.Tipo.DECIMAL;
        }
        else if (this.type == "boolean") {
            tipo = Retorno_1.Tipo.BOOLEAN;
        }
        else if (this.type == "char") {
            tipo = Retorno_1.Tipo.CARACTER;
        }
        else if (this.type == "string") {
            tipo = Retorno_1.Tipo.CADENA;
        }
        for (const id of this.ids) {
            if (this.value != null) {
                const val = this.value.ejecutar(scope);
                if (val.type == tipo) {
                    scope.crearVar(id, val.value, val.type, this.linea, this.columna);
                }
                else {
                    throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. " + "Se espera un " + Retorno_1.Tipo[tipo] + ", y se encontró " + Retorno_1.Tipo[val.type]);
                }
            }
            else {
                // si no se inicializa la variable se declara con los valores por defecto               
                scope.crearVar(id, null, tipo, this.linea, this.columna);
            }
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