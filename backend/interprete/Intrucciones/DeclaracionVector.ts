import { _Error } from "../Error/_Error";
import { Expresion } from "../Expresion/Expresion";
import { Tipo } from "../Expresion/Retorno";
import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";

export class DeclaracionVector1 extends Instruccion {
    constructor(private type1: string, private id: string, private type2: string, private dimensiones: Expresion[], linea: number, columna: number) {
        super(linea, columna); 
    }

    public ejecutar(scope: Scope): Retorno {
        let dimension = [];
        for (const d of this.dimensiones) {
            let value = d.ejecutar(scope);
            if (value.type != Tipo.ENTERO) {
                throw new _Error(this.linea, this.columna, "Semántico", "No se puede crear una dimensión con el valor de " + value.value);
            } 
            dimension.push(value);
        }
        // obteniendo la lista creada (uno o dos dimensiones)
        let lista = this.crearLista(dimension);
        let tipo = this.tipo();
        scope.crearVar(this.id, lista, tipo, this.linea, this.columna);
        console.log("value: ")
        for (const l of lista) {
            if (l instanceof Array) {
                for (const l2 of l) {
                    console.log(l2);
                }
                console.log("-----------------")
            } else {
                console.log(l);
            }
        }
        return null;
    }

    public crearLista(dimension: any[]): any {
        let lista;
        if (dimension.length == 1) {
            // creando la lista
            lista = Array(dimension[0].value);
            // llenando la lista con sus valores por default
            for (let i = 0; i < lista.length; i++) {
                lista[i] = this.valorDefault();
            }
        } else if (dimension.length == 2) {
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
        } else {
            throw new _Error(this.linea, this.columna, "Semántico", "Dimensional inexistente. Solo se permiten los vectores de una y dos dimensiones.");
        }
        return lista;
    }
        

    public valorDefault(): any {
        let tipo = this.tipo();
        if (tipo == Tipo.ENTERO) {
            return 0;
        } else if (tipo == Tipo.DECIMAL) {
            return (0).toFixed(1);
        } else if (tipo == Tipo.BOOLEAN) {
            return true;
        } else if (tipo == Tipo.CARACTER) {
            return '\u0000';
        } else if (tipo == Tipo.CADENA) {
            return "";
        }
    }

    public tipo(): Tipo {
        if(this.type1 == this.type2) {
            if (this.type1 == 'int') {
                return Tipo.ENTERO;
            } else if (this.type1 == 'double') {
                return Tipo.DECIMAL;
            } else if (this.type1 == 'boolean') {
                return Tipo.BOOLEAN;
            } else if (this.type1 == 'char') {
                return Tipo.CARACTER;
            } else if (this.type1 == 'string') {
                return Tipo.CADENA;
            }
        }
        throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. Se esperaba " + this.type1.toLocaleUpperCase() + " y se encontró " + this.type2.toUpperCase());
    }
}

export class DeclaracionVector2 extends Instruccion {
    constructor(private type: string, private id: string, private expresiones: Expresion[]| Expresion[][] | Expresion, linea: number, columna: number) {
        super(linea, columna); 
    }

    public ejecutar(scope: Scope): Retorno {
        let tipo: Tipo;
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
                } else {  
                    let valor = expresion.ejecutar(scope);
                    tipo = this.tipo(valor.type);
                    valorExpresiones.push(valor.value);
                }
            }
            if (flag) {
                valorExpresiones = valorExpresiones.reverse();
            }
        } else {
            const val = this.expresiones.ejecutar(scope);
            if (!(val.value instanceof Array)) {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede asignar " + val.value + " a un vector.");
            }
            valorExpresiones = val.value
            tipo = val.type;
        }
      
        scope.crearVar(this.id, valorExpresiones, tipo, this.linea, this.columna);
        return null;
    }
    
    public tipo(tipo: Tipo): Tipo {
        if (this.type == 'int') {
            if (tipo == Tipo.ENTERO) {
                return Tipo.ENTERO;
            }
        } else if (this.type == 'double') {
            if (tipo == Tipo.DECIMAL) {
                return Tipo.DECIMAL;
            }
        } else if (this.type == 'boolean') {
            if (tipo == Tipo.BOOLEAN) {
                return Tipo.BOOLEAN;
            }
        } else if (this.type == 'char') {
            if (tipo == Tipo.CARACTER) {
                return Tipo.CARACTER;
            }
        } else if (this.type == 'string') {
            if (tipo == Tipo.CADENA) {
                return Tipo.CADENA;
            }
        }
        throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. Se esperaba " + this.type.toLocaleUpperCase() + " y se encontró " + Tipo[tipo]);
    }
}

export class AsignacionVectorSimple extends Instruccion {
    constructor(private id: string, private posiciones: Expresion[], private value: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // obtenemos el valor de la expresion (value, type)
        const val = this.value.ejecutar(scope);
        // obtenemos las posiciones
        let posicion = [];
        for (const pos of this.posiciones) {
            let value = pos.ejecutar(scope);
            if (value.type != Tipo.ENTERO) {
                throw new _Error(this.linea, this.columna, "Semántico", "No se puede acceder a la posicion " + value.value);
            } 
            posicion.push(value.value);
        }
        scope.setValorVector(this.id, val.value, posicion, val.type, this.linea, this.columna);
        return null;
    }
}