import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { TipoAritmetica } from "./Aritmetica";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";
import { Acceso } from "./Acceso";

export class IncrementoDecremento extends Expresion {
    constructor(private expresion: Acceso, private tipo: TipoAritmetica, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // valor de la expresion 
        const valorExpresion = this.expresion.ejecutar(scope);
        let valueDespues;
        if (this.tipo == TipoAritmetica.SUMA) {
            if (valorExpresion.type == Tipo.ENTERO || valorExpresion.type == Tipo.DECIMAL) {
                scope.setValor(this.expresion.id, valorExpresion.value + 1, valorExpresion.type, this.linea, this.columna);
                return { value: valorExpresion.value, type: valorExpresion.type, output: valorExpresion.output };
            }
            throw new _Error(this.linea, this.columna, "Semántico", "No se puede incrementar el siguiente valor: " + valorExpresion.value);
        } else {
            if (valorExpresion.type == Tipo.ENTERO || valorExpresion.type == Tipo.DECIMAL) {
                scope.setValor(this.expresion.id, valorExpresion.value - 1, valorExpresion.type, this.linea, this.columna);
                return { value: valorExpresion.value, type: valorExpresion.type, output: valorExpresion.output };
            }
            throw new _Error(this.linea, this.columna, "Semántico", "No se puede decrementar el siguiente valor: " + valorExpresion.value);
        }
    }
}