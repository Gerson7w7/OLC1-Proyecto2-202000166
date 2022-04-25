import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class TypeOf extends Expresion {
    constructor(private expresion: Expresion, linea:number, columna:number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // ejecutando la expresion
        const val = this.expresion.ejecutar(scope);
        if (val.value instanceof Array) {
            return { value: "VECTOR", type: Tipo.CADENA, output: val.output };
        }
        // devolviendo el tipo de dato
        return { value: Tipo[val.type].toString(), type: Tipo.CADENA, output: val.output };
    }
}