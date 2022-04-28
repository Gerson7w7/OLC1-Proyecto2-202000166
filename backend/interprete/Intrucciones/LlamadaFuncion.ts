import { _Error } from "../Error/_Error";
import { Expresion } from "../Expresion/Expresion";
import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";

export class LlamadaFuncion extends Instruccion {
    constructor(private id: string, private argumentos: Expresion[] | null, linea:number, columna:number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // obtenemos la función (si se encuentra)
        const funcion = scope.getFuncion(this.id, this.linea, this.columna);
        if (this.argumentos.length != funcion.parametros.length) {
            // si los parámetros no coinciden con la cantidad de argumentos es un error semántico
            throw new _Error(this.linea, this.columna, "Semántico", "La cantidad de argumentos es errónea.");    
        }
        // comprobamos si los argumentos que nos mandan son del tipo de los parametros
        funcion.tipoArgumentos(this.argumentos, scope)
        // obteniendo el scope global y creando el nuevo scope para la funcion
        const newScope = new Scope(scope.getGlobal()); 
        for (let i = 0; i < this.argumentos.length; i++) {
            // argumentos de la llamada a la función
            const valueArgs = this.argumentos[i].ejecutar(scope);
            let id:any;
            if (funcion.parametros[i].ids != undefined) {
                id = funcion.parametros[i].ids[0]
            } else {
                id = funcion.parametros[i].id
            }
            newScope.crearVar(id, valueArgs.value, valueArgs.type, this.linea, this.columna);
        }
        // ejecutando las instrucciones de la función
        const valBloque = funcion.bloque.ejecutar(newScope);
        // verificando si el retorno de la función es del tipo correcto
        if (valBloque.retorno != null) {
            funcion.tipoDato(valBloque.retorno.type);
        } else {
            funcion.tipoDato(null);
        }
        return valBloque;
    }
}