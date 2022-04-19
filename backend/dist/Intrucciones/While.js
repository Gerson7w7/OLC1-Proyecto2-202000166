"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const _Error_1 = require("../Error/_Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
const Transferencias_1 = require("./Transferencias");
class While extends Instruccion_1.Instruccion {
    constructor(condicion, bloque, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.bloque = bloque;
    }
    ejecutar(scope) {
        // ejecutamos la condición
        // esta vez con let, ya que la ejecutaremos varias veces hasta que deje de cumplirse la condicion
        let value = this.condicion.ejecutar(scope);
        // comprobamos si nos devuelve un boolean
        if (value.type != Retorno_1.Tipo.BOOLEAN) {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "La condición a evaluar tiene que retornar BOOLEAN, y se obtuvo " + Retorno_1.Tipo[value.type]);
        }
        let salida = "";
        // mientras value.value == true
        while (value.value) {
            const retorno = this.bloque.ejecutar(scope);
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
            // ejecutamos otra vez la condicion
            value = this.condicion.ejecutar(scope);
            // comprobamos si nos devuelve un boolean
            if (value.type != Retorno_1.Tipo.BOOLEAN) {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "La condición a evaluar tiene que retornar BOOLEAN, y se obtuvo " + Retorno_1.Tipo[value.type]);
            }
        }
        return { output: salida, transferencia: null, retorno: null };
    }
}
exports.While = While;
//# sourceMappingURL=While.js.map