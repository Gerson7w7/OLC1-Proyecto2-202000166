"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionVectorSimple = exports.DeclaracionVector2 = exports.DeclaracionVector1 = void 0;
const _Error_1 = require("../Error/_Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class DeclaracionVector1 extends Instruccion_1.Instruccion {
    constructor(type1, id, type2, dimensiones, linea, columna) {
        super(linea, columna);
        this.type1 = type1;
        this.id = id;
        this.type2 = type2;
        this.dimensiones = dimensiones;
    }
    ejecutar(scope) {
        let dimension = [];
        for (const d of this.dimensiones) {
            let value = d.ejecutar(scope);
            if (value.type != Retorno_1.Tipo.ENTERO) {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "No se puede crear una dimensión con el valor de " + value.value);
            }
            dimension.push(value);
        }
        // obteniendo la lista creada (uno o dos dimensiones)
        let lista = this.crearLista(dimension);
        let tipo = this.tipo();
        scope.crearVar(this.id, lista, tipo, this.linea, this.columna);
        console.log("value: ");
        for (const l of lista) {
            if (l instanceof Array) {
                for (const l2 of l) {
                    console.log(l2);
                }
                console.log("-----------------");
            }
            else {
                console.log(l);
            }
        }
        return null;
    }
    crearLista(dimension) {
        let lista;
        if (dimension.length == 1) {
            // creando la lista
            lista = Array(dimension[0].value);
            // llenando la lista con sus valores por default
            for (let i = 0; i < lista.length; i++) {
                lista[i] = this.valorDefault();
            }
        }
        else if (dimension.length == 2) {
            // creando la lista
            lista = Array(dimension[0].value);
            for (let i = 0; i < lista.length; i++) {
                lista[i] = Array(dimension[1].value);
            }
            // llenando la lista con sus valores por default
            for (let i = 0; i < lista.length; i++) {
                for (let j = 0; j < lista[i].length; j++) {
                    lista[i][j] = this.valorDefault();
                }
            }
        }
        else {
            throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Dimensional inexistente. Solo se permiten los vectores de una y dos dimensiones.");
        }
        return lista;
    }
    valorDefault() {
        let tipo = this.tipo();
        if (tipo == Retorno_1.Tipo.ENTERO) {
            return 0;
        }
        else if (tipo == Retorno_1.Tipo.DECIMAL) {
            return (0).toFixed(1);
        }
        else if (tipo == Retorno_1.Tipo.BOOLEAN) {
            return true;
        }
        else if (tipo == Retorno_1.Tipo.CARACTER) {
            return '\u0000';
        }
        else if (tipo == Retorno_1.Tipo.CADENA) {
            return "";
        }
    }
    tipo() {
        if (this.type1 == this.type2) {
            if (this.type1 == 'int') {
                return Retorno_1.Tipo.ENTERO;
            }
            else if (this.type1 == 'double') {
                return Retorno_1.Tipo.DECIMAL;
            }
            else if (this.type1 == 'boolean') {
                return Retorno_1.Tipo.BOOLEAN;
            }
            else if (this.type1 == 'char') {
                return Retorno_1.Tipo.CARACTER;
            }
            else if (this.type1 == 'string') {
                return Retorno_1.Tipo.CADENA;
            }
        }
        throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. Se esperaba " + this.type1.toLocaleUpperCase() + " y se encontró " + this.type2.toUpperCase());
    }
}
exports.DeclaracionVector1 = DeclaracionVector1;
class DeclaracionVector2 extends Instruccion_1.Instruccion {
    constructor(type, id, expresiones, linea, columna) {
        super(linea, columna);
        this.type = type;
        this.id = id;
        this.expresiones = expresiones;
    }
    ejecutar(scope) {
        let tipo;
        let valorExpresiones = [];
        if (this.expresiones instanceof Array) {
            let flag = false;
            for (const expresion of this.expresiones) {
                if (expresion instanceof Array) {
                    flag = true;
                    let valorExpresiones2 = [];
                    for (const expresion2 of expresion) {
                        let valor = expresion2.ejecutar(scope);
                        tipo = this.tipo(valor.type);
                        valorExpresiones2.push(valor.value);
                    }
                    valorExpresiones.push(valorExpresiones2);
                }
                else {
                    let valor = expresion.ejecutar(scope);
                    tipo = this.tipo(valor.type);
                    valorExpresiones.push(valor.value);
                }
            }
            if (flag) {
                valorExpresiones = valorExpresiones.reverse();
            }
        }
        else {
            const val = this.expresiones.ejecutar(scope);
            if (!(val.value instanceof Array)) {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede asignar " + val.value + " a un vector.");
            }
            valorExpresiones = val.value;
            tipo = val.type;
        }
        scope.crearVar(this.id, valorExpresiones, tipo, this.linea, this.columna);
        return null;
    }
    tipo(tipo) {
        if (this.type == 'int') {
            if (tipo == Retorno_1.Tipo.ENTERO) {
                return Retorno_1.Tipo.ENTERO;
            }
        }
        else if (this.type == 'double') {
            if (tipo == Retorno_1.Tipo.DECIMAL) {
                return Retorno_1.Tipo.DECIMAL;
            }
        }
        else if (this.type == 'boolean') {
            if (tipo == Retorno_1.Tipo.BOOLEAN) {
                return Retorno_1.Tipo.BOOLEAN;
            }
        }
        else if (this.type == 'char') {
            if (tipo == Retorno_1.Tipo.CARACTER) {
                return Retorno_1.Tipo.CARACTER;
            }
        }
        else if (this.type == 'string') {
            if (tipo == Retorno_1.Tipo.CADENA) {
                return Retorno_1.Tipo.CADENA;
            }
        }
        throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. Se esperaba " + this.type.toLocaleUpperCase() + " y se encontró " + Retorno_1.Tipo[tipo]);
    }
}
exports.DeclaracionVector2 = DeclaracionVector2;
class AsignacionVectorSimple extends Instruccion_1.Instruccion {
    constructor(id, posiciones, value, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.posiciones = posiciones;
        this.value = value;
    }
    ejecutar(scope) {
        // obtenemos el valor de la expresion (value, type)
        const val = this.value.ejecutar(scope);
        // obtenemos las posiciones
        let posicion = [];
        for (const pos of this.posiciones) {
            let value = pos.ejecutar(scope);
            if (value.type != Retorno_1.Tipo.ENTERO) {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "No se puede acceder a la posicion " + value.value);
            }
            posicion.push(value.value);
        }
        scope.setValorVector(this.id, val.value, posicion, val.type, this.linea, this.columna);
        return null;
    }
}
exports.AsignacionVectorSimple = AsignacionVectorSimple;
//# sourceMappingURL=DeclaracionVector.js.map