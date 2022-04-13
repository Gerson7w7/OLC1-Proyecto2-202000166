"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
const Retorno_1 = require("../Expresion/Retorno");
const Simbolo_1 = require("./Simbolo");
const _Error_1 = require("../Error/_Error");
class Scope {
    constructor(padre) {
        this.padre = padre;
        this.variables = new Map();
    }
    crearVar(id, value, type, linea, columna) {
        let scope = this;
        //console.log("valor: " + value);
        while (scope != null) {
            if (scope.variables.has(id)) {
                throw new _Error_1._Error(linea, columna, "Semántico", "La variable " + id + " ya ha sido declarada.");
            }
            scope = scope.padre;
        }
        if (value == null) {
            console.log("toy aki");
            if (type == Retorno_1.Tipo.ENTERO) {
                this.variables.set(id, new Simbolo_1.Simbolo(0, id, type));
            }
            else if (type == Retorno_1.Tipo.DECIMAL) {
                this.variables.set(id, new Simbolo_1.Simbolo((0).toFixed(1), id, type));
            }
            else if (type == Retorno_1.Tipo.CADENA) {
                this.variables.set(id, new Simbolo_1.Simbolo("", id, type));
            }
            else if (type == Retorno_1.Tipo.CARACTER) {
                this.variables.set(id, new Simbolo_1.Simbolo('\u0000', id, type));
            }
            else if (type == Retorno_1.Tipo.BOOLEAN) {
                this.variables.set(id, new Simbolo_1.Simbolo(true, id, type));
            }
        }
        else {
            this.variables.set(id, new Simbolo_1.Simbolo(value, id, type));
        }
    }
    setValor(id, value, type, linea, columna) {
        let scope = this;
        while (scope != null) {
            if (scope.variables.has(id)) {
                const val = scope.variables.get(id);
                if (val.type == type) {
                    scope.variables.set(id, new Simbolo_1.Simbolo(value, id, type));
                }
                else {
                    throw new _Error_1._Error(linea, columna, "Semántico", "Tipos incompatibles, " + type + " no puede convertirse a " + val.type);
                }
            }
            scope = scope.padre;
        }
    }
    setValorVector(id, value, posicion, type, linea, columna) {
        let scope = this;
        while (scope != null) {
            if (scope.variables.has(id)) {
                const val = scope.variables.get(id);
                if (val.type == type) {
                    if (posicion.length == 1) {
                        if (val.valor.length <= posicion[0]) {
                            throw new _Error_1._Error(linea, columna, 'Semántico', 'No se puede asignar el valor. La posición [' + posicion[0] + '] no existe.');
                        }
                        val.valor[posicion[0]] = value;
                        scope.variables.set(id, new Simbolo_1.Simbolo(val.valor, id, type));
                    }
                    else if (posicion.length == 2) {
                        if ((val.valor.length <= posicion[0]) || (val.valor[0].length <= posicion[1])) {
                            throw new _Error_1._Error(linea, columna, 'Semántico', 'No se puede asignar el valor. La posición [' + posicion[0] + '][' + posicion[1] + '] no existe.');
                        }
                        else if (value instanceof Array) {
                            throw new _Error_1._Error(linea, columna, "Semántico", "No se puede asignar un vector a esta posición. Se ha llegado al máximo de dimensiones (2)");
                        }
                        val.valor[posicion[0]][posicion[1]] = value;
                        scope.variables.set(id, new Simbolo_1.Simbolo(val.valor, id, type));
                    }
                    else {
                        throw new _Error_1._Error(linea, columna, "Semántico", "No se puede acceder a un vector de " + posicion.length + " dimensiones.");
                    }
                }
                else {
                    throw new _Error_1._Error(linea, columna, "Semántico", "Tipos incompatibles, " + type + " no puede convertirse a " + val.type);
                }
            }
            scope = scope.padre;
        }
    }
    getValor(id, linea, columna) {
        let scope = this;
        while (scope != null) {
            if (scope.variables.has(id)) {
                return scope.variables.get(id);
            }
            scope = scope.padre;
        }
        throw new _Error_1._Error(linea, columna, "Semántico", "No se ha declarado la variable " + id);
    }
}
exports.Scope = Scope;
//# sourceMappingURL=Scope.js.map