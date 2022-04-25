import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";

export class Acceso extends Expresion {
    constructor(public id: string, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const value = scope.getValor(this.id, this.linea, this.columna);
        if(value != null) {
            return {value: value.valor, type: value.type, output: null}
        }
        throw new _Error(this.linea, this.columna, 'Semántico', 'No se ha declarado la variable ' + value.id);
    }
}