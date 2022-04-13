import { Tipo } from "../Expresion/Retorno";
import { Simbolo } from "./Simbolo";
import { _Error } from "../Error/_Error";

export class Scope {
    public variables: Map<string, Simbolo>;

    constructor(public padre: Scope | null) {
        this.variables = new Map();
    }

    public crearVar(id: string, value: any, type: Tipo, linea: number, columna: number) {
        let scope: Scope | null = this;
        //console.log("valor: " + value);

        while(scope != null) {
            if(scope.variables.has(id)) { 
                throw new _Error(linea, columna, "Semántico", "La variable " + id + " ya ha sido declarada.");
            }
            scope = scope.padre;
        }
        if(value == null) {
            console.log("toy aki");
            if(type == Tipo.ENTERO) {
                this.variables.set(id, new Simbolo(0, id, type));
            } else if(type == Tipo.DECIMAL) {
                this.variables.set(id, new Simbolo((0).toFixed(1), id, type));
            } else if(type == Tipo.CADENA) {
                this.variables.set(id, new Simbolo("", id, type));
            } else if(type == Tipo.CARACTER) {
                this.variables.set(id, new Simbolo('\u0000', id, type));
            } else if(type == Tipo.BOOLEAN) {
                this.variables.set(id, new Simbolo(true, id, type));
            }
        } else {
            this.variables.set(id, new Simbolo(value, id, type));
        }
    }

    public setValor(id: string, value: any, type: Tipo, linea: number, columna: number) {
        let scope: Scope | null = this;

        while(scope != null) {
            if(scope.variables.has(id)) {
                const val = scope.variables.get(id);
                if(val.type == type) {
                    scope.variables.set(id, new Simbolo(value, id, type));
                } else {
                    throw new _Error(linea, columna, "Semántico", "Tipos incompatibles, " + type + " no puede convertirse a " + val.type);
                }
            }
            scope = scope.padre;
        }
    }

    public setValorVector(id: string, value: any, posicion: number[], type: Tipo, linea: number, columna: number) {
        let scope: Scope | null = this;

        while(scope != null) {
            if(scope.variables.has(id)) {
                const val = scope.variables.get(id);
                if(val.type == type) {
                    if (posicion.length == 1) {
                        if (val.valor.length <= posicion[0]) {
                            throw new _Error(linea, columna, 'Semántico', 'No se puede asignar el valor. La posición [' + posicion[0] + '] no existe.');
                        }
                        val.valor[posicion[0]] = value;
                        scope.variables.set(id, new Simbolo(val.valor, id, type));
                    } else if (posicion.length == 2) {
                        if ((val.valor.length <= posicion[0]) || (val.valor[0].length <= posicion[1])) {
                            throw new _Error(linea, columna, 'Semántico', 'No se puede asignar el valor. La posición [' + posicion[0] + '][' + posicion[1] + '] no existe.');
                        } else if (value instanceof Array) {
                            throw new _Error(linea, columna, "Semántico", "No se puede asignar un vector a esta posición. Se ha llegado al máximo de dimensiones (2)");
                        }
                        val.valor[posicion[0]][posicion[1]] = value;
                        scope.variables.set(id, new Simbolo(val.valor, id, type));
                    } else {
                        throw new _Error(linea, columna, "Semántico", "No se puede acceder a un vector de " + posicion.length + " dimensiones.");
                    }
                } else {
                    throw new _Error(linea, columna, "Semántico", "Tipos incompatibles, " + type + " no puede convertirse a " + val.type);
                }
            }
            scope = scope.padre;
        }
    }

    public getValor(id: string, linea: number, columna: number): Simbolo {
        let scope: Scope | null = this;
        while(scope != null) {
            if(scope.variables.has(id)) {
                return scope.variables.get(id);
            }
            scope = scope.padre;
        }
        throw new _Error(linea, columna, "Semántico", "No se ha declarado la variable " + id);
    }
}