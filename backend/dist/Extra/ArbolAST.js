"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbolAST = exports.Nodo = void 0;
let id = 0;
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.id = 0;
        this.hijos = [];
    }
    getValor() {
        this.valor;
    }
    agregarHijo(hijo) {
        this.hijos.push(hijo);
    }
}
exports.Nodo = Nodo;
class ArbolAST {
    constructor() {
        id = 0;
    }
    recorrerArbol(nodo) {
        let salida;
        if (nodo != null) {
            if (nodo.id == 0) {
                nodo.id = id;
                id++;
            }
            salida = nodo.id + '[label="' + nodo.valor + '" shape="circle"];';
            nodo.hijos.forEach(element => {
                salida += nodo.id + '->' + id + ';';
                salida += this.recorrerArbol(element);
            });
            return salida;
        }
        return "";
    }
}
exports.ArbolAST = ArbolAST;
//# sourceMappingURL=ArbolAST.js.map