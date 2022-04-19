import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class ToString extends Expresion {
    constructor(private expresion: Expresion, linea:number, columna:number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // ejecutando la expresion
        const val = this.expresion.ejecutar(scope);
        if (val.type != Tipo.ENTERO && val.type != Tipo.DECIMAL && val.type != Tipo.BOOLEAN) {
            throw new _Error(this.linea, this.columna, "Semántico", "Se esperaba un ENTERO, DECIMAL o BOOLEAN y se obtuvo un " + Tipo[val.type]);
        }
        // devolviendo un string
        return { value: val.value.toString(), type: Tipo.CADENA };
    }
}