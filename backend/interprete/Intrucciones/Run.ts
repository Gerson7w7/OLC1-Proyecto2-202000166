import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";

export class Run extends Instruccion {
    constructor (private funcion: Instruccion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        return this.funcion.ejecutar(scope);
    }
}