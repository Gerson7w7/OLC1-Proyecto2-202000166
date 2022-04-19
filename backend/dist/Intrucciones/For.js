"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const _Error_1 = require("../Error/_Error");
const Retorno_1 = require("../Expresion/Retorno");
const Scope_1 = require("../Extra/Scope");
const Instruccion_1 = require("./Instruccion");
const Transferencias_1 = require("./Transferencias");
class For extends Instruccion_1.Instruccion {
    constructor(id, condicion, actualizacion, bloque, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.bloque = bloque;
    }
    ejecutar(scope) {
        // un nuevo scope
        const newScope = new Scope_1.Scope(scope);
        // ejecutamos la declaracion o asignacion
        this.id.ejecutar(newScope);
        // ejecutamos la condicion
        let valCondicion = this.condicion.ejecutar(newScope);
        // comprobamos si nos devuelve un boolean
        if (valCondicion.type != Retorno_1.Tipo.BOOLEAN) {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "La condición a evaluar tiene que retornar BOOLEAN, y se obtuvo " + Retorno_1.Tipo[valCondicion.type]);
        }
        let salida = "";
        // simulando el for
        while (valCondicion.value) {
            // ejecutamos el código dentro del bloque
            const retorno = this.bloque.ejecutar(newScope);
            // verificamos si hay sentencias de transferencias
            if (retorno != null && retorno != undefined) {
                if (retorno.transferencia != null) {
                    if (retorno.transferencia.type == Transferencias_1.TipoTransferencia.BREAK) {
                        if (retorno.output != null) {
                            salida += retorno.output;
                        }
                        break;
                    }
                    else if (retorno.transferencia.type == Transferencias_1.TipoTransferencia.CONTINUE) {
                        if (retorno.output != null) {
                            salida += retorno.output;
                        }
                        continue;
                    }
                    else if (retorno.transferencia.type == Transferencias_1.TipoTransferencia.RETURN) {
                        if (retorno.output != null) {
                            salida += retorno.output;
                        }
                        return { output: salida, transferencia: retorno.transferencia, retorno: retorno.retorno };
                    }
                }
                else if (retorno.output != null) {
                    salida += retorno.output;
                }
            }
            // ejecutamos la actualización
            this.actualizacion.ejecutar(newScope);
            // ejecutamos otra vez la condicion
            valCondicion = this.condicion.ejecutar(newScope);
        }
        return { output: salida, transferencia: null, retorno: null };
    }
}
exports.For = For;
//# sourceMappingURL=For.js.map