import { _Error } from "../Error/_Error";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class Aritmetica extends Expresion {
    constructor(private izquierda: Expresion, private derecha: Expresion, private tipo: TipoAritmetica, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(): Retorno {
        // valores de las expresiones 
        const valorIzquierda = this.izquierda.ejecutar();
        const valorDerecha = this.derecha.ejecutar();
        let dominante;

        if (this.tipo == TipoAritmetica.SUMA) {
            dominante = this.tipoDominanteSuma(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.ENTERO };
            } else if (dominante == Tipo.DECIMAL) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.DECIMAL };
            } else if (dominante == Tipo.CADENA) {
                return { value: (valorIzquierda.value.toString() + valorDerecha.value.toString()), type: Tipo.CADENA };
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador +.");
            }
        } else if (this.tipo == TipoAritmetica.RESTA) {
            dominante = this.tipoDominanteResta(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.ENTERO };
            } else if (dominante == Tipo.DECIMAL) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.DECIMAL };
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador -.");
            }
        } else if (this.tipo == TipoAritmetica.MULTIPLICACION) {
            dominante = this.tipoDominanteMultiplicacion(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.ENTERO };
            } else if (dominante == Tipo.DECIMAL) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.DECIMAL };
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador *.");
            }
        } else if (this.tipo == TipoAritmetica.DIVISION) {
            dominante = this.tipoDominanteDivision(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                if (valorDerecha.value != 0) {
                    return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.ENTERO };
                }
                throw new _Error(this.linea, this.columna, "Semántico", "Valor indeterminado. No se puede operar " + valorIzquierda.value + " entre 0.");
            } else if (dominante == Tipo.DECIMAL) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.DECIMAL };
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador /.");
            }
        } else if (this.tipo == TipoAritmetica.POTENCIA) {
            dominante = this.tipoDominantePotencia(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.ENTERO };
            } else if (dominante == Tipo.DECIMAL) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.DECIMAL };
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador ^.");
            }
        } else if (this.tipo == TipoAritmetica.MODULO) {
            dominante = this.tipoDominanteModulo(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.ENTERO };
            } else if (dominante == Tipo.DECIMAL) {
                return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.DECIMAL };
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador %.");
            }
        }
        throw new _Error(this.linea, this.columna, "Semántico", "Error");
    }
}

export enum TipoAritmetica {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO
}