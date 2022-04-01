import { Expresion } from "../Expresion/Expresion";
import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";

export class Declaracion extends Instruccion {
    constructor(private ids: string[], private value: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): void {
        for (const id in this.ids) {
            const val = this.value.ejecutar(scope);
            scope.crearVar(id, val.value, val.type, this.linea, this.columna);
        }
    }
}

export class AsignacionSimple extends Instruccion {
    constructor(private id: string, private value: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): void {
        const val = this.value.ejecutar(scope);
        scope.setValor(this.id, val.value, val.type, this.linea, this.columna);
    }
}