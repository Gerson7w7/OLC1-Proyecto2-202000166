import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class Length extends Expresion {
    constructor(private expresion: Expresion, linea:number, columna:number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // ejecutando la expresion
        const val = this.expresion.ejecutar(scope);
        if (!(val.value instanceof Array) && val.type != Tipo.CADENA) {
            throw new _Error(this.linea, this.columna, "Semántico", "Se esperaba un VECTOR, LISTA o CADENA y se obtuvo un " + Tipo[val.type]);
        }
        return { value: val.value.length, type: Tipo.ENTERO, output: val.output };
    }
}