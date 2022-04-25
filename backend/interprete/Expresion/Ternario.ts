import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class Ternario extends Expresion {
    constructor(private relacion: Expresion, private case1: Expresion, private case2: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // valor de la condicion (true or false) 
        const valorCondicion = this.relacion.ejecutar(scope);
        // valor de los cases
        const valorCase1 = this.case1.ejecutar(scope);
        const valorCase2 = this.case2.ejecutar(scope);

        if(valorCondicion.type == Tipo.BOOLEAN) {
            if(valorCondicion.value == true) {
                return { value: valorCase1.value, type: valorCase1.type, output: valorCase1.output };
            } else {
                return { value: valorCase2.value, type: valorCase2.type, output: valorCase2.output };
            }
        }
        throw new _Error(this.linea, this.columna, "Semántico", "Se esperaba un " + Tipo[Tipo.BOOLEAN] + " como condición, y se encontró un " + Tipo[valorCondicion.type]);
    }
}