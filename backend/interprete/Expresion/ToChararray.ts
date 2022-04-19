import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class ToChararray extends Expresion {
    constructor(private expresion: Expresion, linea:number, columna:number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // ejecutando la expresion
        const val = this.expresion.ejecutar(scope);
        if (val.type != Tipo.CADENA) {
            throw new _Error(this.linea, this.columna, "Semántico", "Se esperaba una CADENA y se obtuvo un " + Tipo[val.type]);
        }
        // devolviendo un vector
        return { value: Array.from(val.value), type: Tipo.CARACTER };
    }
}