import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class Logico extends Expresion {
    constructor(private izquierda: Expresion, private derecha: Expresion, private tipo: TipoLogico, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // la derecha puede venir null ya que puede que se trate de NOT que solo consta de una expresion
        const valorIzquierda = this.izquierda.ejecutar(scope);
        let valorDerecha = null;
        if(this.derecha != null) {
            valorDerecha = this.derecha.ejecutar(scope);
        }

        if (valorIzquierda.type == Tipo.BOOLEAN && valorDerecha == null) {
            return { value: (!valorIzquierda.value), type: Tipo.BOOLEAN, output: valorIzquierda.output };
        } else if (valorIzquierda.type == Tipo.BOOLEAN && valorDerecha.type == Tipo.BOOLEAN) {
            if (this.tipo == TipoLogico.OR) {
                return { value: (valorIzquierda.value || valorDerecha.value), type: Tipo.BOOLEAN, output: valorIzquierda.output + valorDerecha.output };
            } 
            return { value: (valorIzquierda.value && valorDerecha.value), type: Tipo.BOOLEAN, output: valorIzquierda.output + valorDerecha.output };
        }
        if (valorDerecha == null) {
            throw new _Error(this.linea, this.columna, "Semántico", "No se puede negar a nivel lógico " + valorIzquierda.value);
        }
        throw new _Error(this.linea, this.columna, "Semántico", "No se puede comparar a nivel lógico " + valorIzquierda.value + " con " + valorDerecha.value);
    }
}

export enum TipoLogico {
    NOT,
    AND,
    OR
}