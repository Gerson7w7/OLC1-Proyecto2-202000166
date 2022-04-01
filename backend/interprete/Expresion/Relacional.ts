import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class Literal extends Expresion {
    constructor(private izquierda: Expresion, private derecha: Expresion, private tipo: TipoRelacional, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const valorIzquierda = this.izquierda.ejecutar(scope);
        const valorDerecha = this.derecha.ejecutar(scope);
        let permitido = false;

        if(valorIzquierda.type == Tipo.ENTERO && valorDerecha.type == Tipo.ENTERO) {
            permitido = true;
        } else if (valorIzquierda.type == Tipo.ENTERO && valorDerecha.type == Tipo.DECIMAL) {
            permitido = true;
        } else if (valorIzquierda.type == Tipo.ENTERO && valorDerecha.type == Tipo.CARACTER) {
            permitido = true;
        } else if (valorIzquierda.type == Tipo.DECIMAL && valorDerecha.type == Tipo.ENTERO) {
            permitido = true;
        } else if (valorIzquierda.type == Tipo.DECIMAL && valorDerecha.type == Tipo.CARACTER) {
            permitido = true;
        } else if (valorIzquierda.type == Tipo.CARACTER && valorDerecha.type == Tipo.ENTERO) {
            permitido = true;
        } else if (valorIzquierda.type == Tipo.CARACTER && valorDerecha.type == Tipo.CARACTER) {
            permitido = true;
        }

        if (this.tipo == TipoRelacional.IGUAL && permitido == true) {
            return { value: (valorIzquierda.value == valorDerecha.value), type: Tipo.BOOLEAN };
        } else if (this.tipo == TipoRelacional.DESIGUAL && permitido == true) {
            return { value: (valorIzquierda.value != valorDerecha.value), type: Tipo.BOOLEAN };
        } else if (this.tipo == TipoRelacional.MENOR && permitido == true) {
            return { value: (valorIzquierda.value < valorDerecha.value), type: Tipo.BOOLEAN };
        } else if (this.tipo == TipoRelacional.MENOR_IGUAL && permitido == true) {
            return { value: (valorIzquierda.value <= valorDerecha.value), type: Tipo.BOOLEAN };
        } else if (this.tipo == TipoRelacional.MAYOR && permitido == true) {
            return { value: (valorIzquierda.value > valorDerecha.value), type: Tipo.BOOLEAN };
        } else if (this.tipo == TipoRelacional.MAYOR_IGUAL && permitido == true) {
            return { value: (valorIzquierda.value >= valorDerecha.value), type: Tipo.BOOLEAN };
        }
        throw new _Error(this.linea, this.columna, "Semántico", "Error");
    }
}

export enum TipoRelacional {
    IGUAL,
    DESIGUAL,
    MENOR,
    MENOR_IGUAL,
    MAYOR,
    MAYOR_IGUAL
}