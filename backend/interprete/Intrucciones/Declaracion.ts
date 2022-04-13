import { _Error } from "../Error/_Error";
import { Expresion } from "../Expresion/Expresion";
import { Tipo } from "../Expresion/Retorno";
import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";

export class Declaracion extends Instruccion {
    constructor(private type: string, private ids: string[], private value: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        console.log("tipo: " + this.type)
        let tipo;
        if(this.type == "int") {
            tipo = Tipo.ENTERO;
        } else if (this.type == "double") {
            tipo = Tipo.DECIMAL;
        } else if (this.type == "boolean") {
            tipo = Tipo.BOOLEAN;
        } else if (this.type == "char") {
            tipo = Tipo.CARACTER;
        } else if (this.type == "string") {
            tipo = Tipo.CADENA;
        }

        for (const id of this.ids) { 
            if(this.value != null) { 
                const val = this.value.ejecutar(scope);
                if (!(val.value instanceof Array)) {
                    if(val.type == tipo) {
                        scope.crearVar(id, val.value, val.type, this.linea, this.columna);
                    } else {
                        throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. " + "Se espera un " + Tipo[tipo] + ", y se encontró " + Tipo[val.type]);
                    }
                } else {
                    throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. " + "No se puede asignar un vector en una variable.");
                }     
            } else {
                // si no se inicializa la variable se declara con los valores por defecto               
                scope.crearVar(id, null, tipo, this.linea, this.columna);
            }
        }
        return null;
    }
}

export class AsignacionSimple extends Instruccion {
    constructor(private id: string, private value: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const val = this.value.ejecutar(scope);
        if (val.value instanceof Array) {
            throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. " + "No se puede asignar un vector en una variable.");
        }
        scope.setValor(this.id, val.value, val.type, this.linea, this.columna);
        return null;
    }
}