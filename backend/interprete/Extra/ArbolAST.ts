let id: number = 0;

export class Nodo {
    public id: number;
    public hijos: Array<any>;
    constructor(public valor: string) {
        this.id = 0;
        this.hijos = [];
    }

    public getValor() {
        this.valor
    }

    public agregarHijo(hijo: object) {
        this.hijos.push(hijo);
    }
}

export class ArbolAST {
    constructor() {
        id = 0;
    }

    public recorrerArbol(nodo: Nodo): string {
        let salida: string;
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