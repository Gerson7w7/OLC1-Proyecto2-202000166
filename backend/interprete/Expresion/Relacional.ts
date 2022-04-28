import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class Relacional extends Expresion {
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
        } else if (valorIzquierda.type == Tipo.CADENA && valorDerecha.type == Tipo.CADENA) {
            permitido = true;
        } else if (valorIzquierda.type == Tipo.BOOLEAN && valorDerecha.type == Tipo.BOOLEAN) {
            permitido = true;
        } else if (valorIzquierda.type == Tipo.DECIMAL && valorDerecha.type == Tipo.DECIMAL) {
            permitido = true;
        }

        if (permitido) {
            if (this.tipo == TipoRelacional.IGUAL) {
                return { value: (valorIzquierda.value == valorDerecha.value), type: Tipo.BOOLEAN, output: valorIzquierda.output + valorDerecha.output };
            } else if (this.tipo == TipoRelacional.DESIGUAL) {
                return { value: (valorIzquierda.value != valorDerecha.value), type: Tipo.BOOLEAN, output: valorIzquierda.output + valorDerecha.output };
            } else if (this.tipo == TipoRelacional.MENOR) {
                return { value: (valorIzquierda.value < valorDerecha.value), type: Tipo.BOOLEAN, output: valorIzquierda.output + valorDerecha.output };
            } else if (this.tipo == TipoRelacional.MENOR_IGUAL) {
                return { value: (valorIzquierda.value <= valorDerecha.value), type: Tipo.BOOLEAN, output: valorIzquierda.output + valorDerecha.output };
            } else if (this.tipo == TipoRelacional.MAYOR) {
                return { value: (valorIzquierda.value > valorDerecha.value), type: Tipo.BOOLEAN, output: valorIzquierda.output + valorDerecha.output };
            } else if (this.tipo == TipoRelacional.MAYOR_IGUAL) {
                return { value: (valorIzquierda.value >= valorDerecha.value), type: Tipo.BOOLEAN, output: valorIzquierda.output + valorDerecha.output };
            }
            throw new _Error(this.linea, this.columna, "Semántico", "Error");
        } else {
            throw new _Error(this.linea, this.columna, "Semántico", "Relaciones incompatibles, no se puede comparar " + valorIzquierda.value + " con " + valorDerecha.value);
        }    
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