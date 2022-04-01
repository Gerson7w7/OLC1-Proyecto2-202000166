import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";

export class Acesso extends Expresion {
    constructor(private id: string, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const value = scope.getValor(this.id, this.linea, this.columna);
        if(value != null) {
            return {value: value.valor, type: value.type}
        }
        throw new _Error(this.linea, this.columna, 'Semántico', 'No se ha declarado la variable ' + value.id);
    }
}