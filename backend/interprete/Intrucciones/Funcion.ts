import { _Error } from "../Error/_Error";
import { Expresion } from "../Expresion/Expresion";
import { Tipo } from "../Expresion/Retorno";
import { Scope } from "../Extra/Scope";
import { Bloque } from "./Bloque";
import { Declaracion } from "./Declaracion";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";

export class Funcion extends Instruccion {
    constructor(private id: string, public parametros: Declaracion[], private tipoRetorno: string | null, public bloque: Bloque, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        scope.guardarFuncion(this.id, this, this.linea, this.columna);
        return null;
    }

    // método para validar los tipos de expresiones mandados como argumentos
    public tipoArgumentos(args: Expresion[], scope: Scope) {
        for (let i = 0; i < args.length; i++) {
            // tipo del argumento
            const argType = args[i].ejecutar(scope).type;
            // tipo del parametro
            const paramType = this.parametros[i].type;

            let tipoParam: Tipo;
            if (paramType == "int") {
                tipoParam = Tipo.ENTERO;
            } else if (paramType == "double") {
                tipoParam = Tipo.DECIMAL;
            } else if (paramType == "string") {
                tipoParam = Tipo.CADENA;
            } else if (paramType == "char") {
                tipoParam = Tipo.CARACTER;
            } else if (paramType == "boolean") {
                tipoParam = Tipo.BOOLEAN;
            }

            if (argType != tipoParam) {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. Se esperaba un " + Tipo[tipoParam] + " y se encontró un " + Tipo[argType]);
            }
        }
    }

    // metodo para validar el tipo de dato de retorno
    public tipoDato(tipo: Tipo) {
        let tipoRetorno: Tipo;
        if (this.tipoRetorno != null) {
            if (this.tipoRetorno == "int") {
                tipoRetorno = Tipo.ENTERO;
            } else if (this.tipoRetorno == "double") {
                tipoRetorno = Tipo.DECIMAL;
            } else if (this.tipoRetorno == "string") {
                tipoRetorno = Tipo.CADENA;
            } else if (this.tipoRetorno == "char") {
                tipoRetorno = Tipo.CARACTER;
            } else if (this.tipoRetorno == "boolean") {
                tipoRetorno = Tipo.BOOLEAN;
            } 

            if (tipo != tipoRetorno) {
                if (tipo == null) {
                    throw new _Error(this.linea, this.columna, "Semántico", "Sin retorno. Se espera que se retorne un " + Tipo[tipoRetorno] + " pero no se retornó nada.");
                }
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. El retorno debería ser de tipo " + Tipo[tipoRetorno] + ", pero se encontró un " + Tipo[tipo]);
            }
        } else {
            if (tipo != null) {
                throw new _Error(this.linea, this.columna, "Semántico", "Una función de tipo VOID no puede regresar un valor, se intentó devolver: " + Tipo[tipo]);
            }
        }
    }
}