"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoWhile = void 0;
const Transferencias_1 = require("./Transferencias");
const _Error_1 = require("./../Error/_Error");
const Retorno_1 = require("./../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class DoWhile extends Instruccion_1.Instruccion {
    constructor(bloque, condicion, linea, columna) {
        super(linea, columna);
        this.bloque = bloque;
        this.condicion = condicion;
    }
    ejecutar(scope) {
        // esta vez con let, ya que la ejecutaremos varias veces hasta que deje de cumplirse la condicion
        let value;
        let salida = "";
        // ejecutando el bloque por lo menos una vez
        do {
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
        } while (value.value); // mientras value.value == true
        return { output: salida, transferencia: null, retorno: null };
    }
}
exports.DoWhile = DoWhile;
//# sourceMappingURL=DoWhile.js.map