"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesoVector = void 0;
const _Error_1 = require("../Error/_Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class AccesoVector extends Expresion_1.Expresion {
    constructor(id, dimensiones, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.dimensiones = dimensiones;
    }
    ejecutar(scope) {
        // devuelve la lista entera
        const lista = scope.getValor(this.id, this.linea, this.columna);
        // obtenemos las dimensionales de la lista y la posicion que queremos
        let dimension = [];
        for (const d of this.dimensiones) {
            let value = d.ejecutar(scope);
            if (value.type != Retorno_1.Tipo.ENTERO) {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "No se puede acceder a la posicion " + value.value);
            }
            dimension.push(value.value);
        }
        let valor = this.devolverValor(lista, dimension);
        return { value: valor, type: lista.type };
    }
    devolverValor(lista, dimension) {
        if (lista != null) {
            if (dimension.length == 1) {
                if (lista.valor.length <= dimension[0]) {
                    throw new _Error_1._Error(this.linea, this.columna, 'Semántico', 'No existe la posición [' + dimension[0] + '].');
                }
                return lista.valor[dimension[0]];
            }
            else if (dimension.length == 2) {
                if ((lista.valor.length <= dimension[0]) || (lista.valor[0].length <= dimension[1])) {
                    throw new _Error_1._Error(this.linea, this.columna, 'Semántico', 'No existe la posición [' + dimension[0] + '][' + dimension[1] + '].');
                }
                return lista.valor[dimension[0]][dimension[1]];
            }
            throw new _Error_1._Error(this.linea, this.columna, 'Semántico', 'No se puede acceder a un vector de ' + dimension.length + ' dimensiones.');
        }
        throw new _Error_1._Error(this.linea, this.columna, 'Semántico', 'No se ha declarado la variable ' + lista.id);
    }
}
exports.AccesoVector = AccesoVector;
//# sourceMappingURL=AccesoVector.js.map