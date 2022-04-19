import { TipoTransferencia } from './Transferencias';
import { _Error } from './../Error/_Error';
import { Tipo } from './../Expresion/Retorno';
import { Expresion } from "../Expresion/Expresion";
import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";

export class DoWhile extends Instruccion {
    constructor(private bloque: Instruccion, private condicion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // esta vez con let, ya que la ejecutaremos varias veces hasta que deje de cumplirse la condicion
        let value;
        let salida: string = "";
        // ejecutando el bloque por lo menos una vez
        do {
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
        } while (value.value); // mientras value.value == true
        return { output: salida, transferencia: null, retorno: null };
    }
}