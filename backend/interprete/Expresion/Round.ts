import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class Round extends Expresion {
    constructor(private expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // ejecutamos la expresion
        const val = this.expresion.ejecutar(scope);
        if(val.type != Tipo.DECIMAL) {
            throw new _Error(this.linea, this.columna, "Semántico", "Se esperaba un DECIMAL y se obtuvo un " + Tipo[val.type]);
        }
        return { value: Math.round(val.value), type: Tipo.ENTERO };
    }
}