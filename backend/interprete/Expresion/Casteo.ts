import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class Casteo extends Expresion {
    constructor(private tipo: string, private expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // valor de la expresion 
        const valorExpresion = this.expresion.ejecutar(scope);

        if (valorExpresion.type == Tipo.ENTERO && this.tipo == 'double') {
            return { value: valorExpresion.value.toFixed(1), type: Tipo.DECIMAL, output: valorExpresion.output };
        } else if (valorExpresion.type == Tipo.DECIMAL && this.tipo == 'int') {
            return { value: parseInt(valorExpresion.value, 10), type: Tipo.ENTERO, output: valorExpresion.output };
        } else if (valorExpresion.type == Tipo.ENTERO && this.tipo == 'char') {
            return { value: String.fromCharCode(valorExpresion.value), type: Tipo.CARACTER, output: valorExpresion.output };
        } else if (valorExpresion.type == Tipo.CARACTER && this.tipo == 'int') {
            return { value: valorExpresion.value.charCodeAt(0), type: Tipo.ENTERO, output: valorExpresion.output };
        } else if (valorExpresion.type == Tipo.CARACTER && this.tipo == 'double') {
            return { value: valorExpresion.value.charCodeAt(0).toFixed(1), type: Tipo.DECIMAL, output: valorExpresion.output };
        }
        throw new _Error(this.linea, this.columna, "Semántico", "Error de casteo. No es posible pasar de " + Tipo[valorExpresion.type] + " a " + this.tipo.toUpperCase());
    }
}