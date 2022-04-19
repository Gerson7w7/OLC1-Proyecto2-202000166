import { _Error } from "../Error/_Error";
import { Expresion } from "../Expresion/Expresion";
import { Tipo } from "../Expresion/Retorno";
import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";
import { TipoTransferencia } from "./Transferencias";

export class While extends Instruccion {
    constructor(private condicion: Expresion, private bloque: Instruccion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // ejecutamos la condición
        // esta vez con let, ya que la ejecutaremos varias veces hasta que deje de cumplirse la condicion
        let value = this.condicion.ejecutar(scope);
        // comprobamos si nos devuelve un boolean
        if (value.type != Tipo.BOOLEAN) {
            throw new _Error(this.linea, this.columna, "Semántico", "La condición a evaluar tiene que retornar BOOLEAN, y se obtuvo " + Tipo[value.type]);
        }
        let salida: string = "";
        // mientras value.value == true
        while (value.value) {
            const retorno = this.bloque.ejecutar(scope);
            // verificamos si hay sentencias de transferencias
            if (retorno != null && retorno != undefined) {
                if (retorno.transferencia != null) {
                    if (retorno.transferencia.type == TipoTransferencia.BREAK) {
                        if (retorno.output != null) {
                            salida += retorno.output;
                        }
                        break;
                    } else if (retorno.transferencia.type == TipoTransferencia.CONTINUE) {
                        if (retorno.output != null) {
                            salida += retorno.output;
                        }
                        continue;
                    } else if (retorno.transferencia.type == TipoTransferencia.RETURN) {
                        if (retorno.output != null) {
                            salida += retorno.output;
                        }
                        return { output: salida, transferencia: retorno.transferencia, retorno: retorno.retorno };
                    }
                } else if (retorno.output != null) {
                    salida += retorno.output;
                }
            }
            // ejecutamos otra vez la condicion
            value = this.condicion.ejecutar(scope);
            // comprobamos si nos devuelve un boolean
            if (value.type != Tipo.BOOLEAN) {
                throw new _Error(this.linea, this.columna, "Semántico", "La condición a evaluar tiene que retornar BOOLEAN, y se obtuvo " + Tipo[value.type]);
            }
        }
        return { output: salida, transferencia: null, retorno: null };
    }
}