import { _Error } from "../Error/_Error";
import { Expresion } from "../Expresion/Expresion";
import { Tipo } from "../Expresion/Retorno";
import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";
import { TipoTransferencia } from "./Transferencias";

export class For extends Instruccion {
    constructor(private id: Instruccion, private condicion: Expresion, private actualizacion: Instruccion | Expresion, private bloque: Instruccion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // ejecutamos la declaracion o asignacion
        this.id.ejecutar(scope);
        // ejecutamos la condicion
        let valCondicion = this.condicion.ejecutar(scope);
        // comprobamos si nos devuelve un boolean
        if (valCondicion.type != Tipo.BOOLEAN) {
            throw new _Error(this.linea, this.columna, "Semántico", "La condición a evaluar tiene que retornar BOOLEAN, y se obtuvo " + Tipo[valCondicion.type]);
        }
        let salida: string = "";
        // simulando el for
        while (valCondicion.value) {
            // ejecutamos el código dentro del bloque
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
                    }
                } else if (retorno.output != null) {
                    salida += retorno.output;
                }
            }

            // ejecutamos la actualización
            this.actualizacion.ejecutar(scope);
            // ejecutamos otra vez la condicion
            valCondicion = this.condicion.ejecutar(scope);
        }
        return { output:salida, transferencia: null};
    }
}