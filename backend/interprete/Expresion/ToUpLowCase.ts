import { _Error } from "../Error/_Error";
import { Expresion } from "../Expresion/Expresion";
import { Tipo } from "../Expresion/Retorno";
import { Scope } from "../Extra/Scope";
import { Retorno } from "./Retorno";

// estas clases estarán en las expresiones ya que devuelve una expresion
export class ToUpperCase extends Expresion {
    constructor(private cadena: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // ejecutamos la expresion
        const value = this.cadena.ejecutar(scope);
        if (value.type != Tipo.CADENA) {
            throw new _Error(this.linea, this.columna, "Semántico", "Se esperaba una CADENA y se obtuvo un " + Tipo[value.type]);
        }
        return { value: value.value.toUpperCase(), type: Tipo.CADENA, output: value.output };
    }
}

export class ToLowerCase extends Expresion {
    constructor(private cadena: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // ejecutamos la expresion
        const value = this.cadena.ejecutar(scope);
        if (value.type != Tipo.CADENA) {
            throw new _Error(this.linea, this.columna, "Semántico", "Se esperaba una CADENA y se obtuvo un " + Tipo[value.type]);
        }
        return { value: value.value.toLowerCase(), type: Tipo.CADENA, output: value.output };
    }
}