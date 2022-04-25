import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class Literal extends Expresion {
    constructor(private value: any, private tipo: TipoLiteral, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        if (this.tipo == TipoLiteral.ENTERO) {
            return { value: Number(this.value), type: Tipo.ENTERO, output: null };
        } else if (this.tipo == TipoLiteral.DECIMAL) {
            return { value: Number(this.value), type: Tipo.DECIMAL, output: null };
        } else if (this.tipo == TipoLiteral.BOOLEAN) {
            if (this.value.toString().toLowerCase() == "true") {
                return { value: true, type: Tipo.BOOLEAN, output: null };
            }
            return { value: false, type: Tipo.BOOLEAN, output: null };
        } else if (this.tipo == TipoLiteral.CARACTER) {
            return { value: this.value.toString(), type: Tipo.CARACTER, output: null };
        } else if (this.tipo == TipoLiteral.CADENA) {
            return { value: this.value.toString(), type: Tipo.CADENA, output: null };
        }
        throw new _Error(this.linea, this.columna, "Semántico", "Error");
    }
}

export enum TipoLiteral {
    ENTERO,
    DECIMAL,
    BOOLEAN,
    CARACTER,
    CADENA,
    ERROR
}