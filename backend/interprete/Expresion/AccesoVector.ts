import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Simbolo } from "../Extra/Simbolo";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class AccesoVector extends Expresion {
    constructor(public id: string, private dimensiones: Expresion[], linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // devuelve la lista entera
        const lista = scope.getValor(this.id, this.linea, this.columna);
        // obtenemos las dimensionales de la lista y la posicion que queremos
        let dimension = [];
        for (const d of this.dimensiones) {
            let value = d.ejecutar(scope);
            if (value.type != Tipo.ENTERO) {
                throw new _Error(this.linea, this.columna, "Semántico", "No se puede acceder a la posicion " + value.value);
            } 
            dimension.push(value.value);
        }
        let valor = this.devolverValor(lista, dimension);
        return {value: valor, type: lista.type}
    }

    public devolverValor(lista: Simbolo, dimension: number[]): any {
        if (lista != null) {
            if (dimension.length == 1) {
                if (lista.valor.length <= dimension[0]) {
                    throw new _Error(this.linea, this.columna, 'Semántico', 'No existe la posición [' + dimension[0] + '].');
                }
                return lista.valor[dimension[0]];
            } else if (dimension.length == 2) {
                if ((lista.valor.length <= dimension[0]) || (lista.valor[0].length <= dimension[1])) {
                    throw new _Error(this.linea, this.columna, 'Semántico', 'No existe la posición [' + dimension[0] + '][' + dimension[1] + '].');
                }
                return lista.valor[dimension[0]][dimension[1]];
            } 
            throw new _Error(this.linea, this.columna, 'Semántico', 'No se puede acceder a un vector de ' + dimension.length + ' dimensiones.');
        }
        throw new _Error(this.linea, this.columna, 'Semántico', 'No se ha declarado la variable ' + lista.id);
    }
}