import { _Error } from "../Error/_Error";
import { Expresion } from "../Expresion/Expresion";
import { Tipo } from "../Expresion/Retorno";
import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";

export class IfElse extends Instruccion {
    constructor (private condicion: Expresion, private bloque: Instruccion, private bloqueElse: Instruccion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // ejecutamos y obtenemos el valor de la condición
        const valueCondicion = this.condicion.ejecutar(scope);

        // verificamos que se trate de un boolean, sino lanzamos un error
        if (valueCondicion.type != Tipo.BOOLEAN) {
            throw new _Error(this.linea, this.columna, "Semántico", "La condición a evaluar tiene que retornar BOOLEAN, y se obtuvo " + Tipo[valueCondicion.type]);
        }
        // evaluamos si es true o false
        if (valueCondicion.value) {
            return this.bloque.ejecutar(scope);
        } else if (this.bloqueElse != null) {
            // se ejecutará en los casos que vengan un else o tantos else if como hayan 
            return this.bloqueElse.ejecutar(scope);
        }
    }
}