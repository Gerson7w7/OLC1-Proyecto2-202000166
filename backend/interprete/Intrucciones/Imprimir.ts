import { Expresion } from "../Expresion/Expresion";
import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";

export class Print extends Instruccion {
    constructor(private value: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const val = this.value.ejecutar(scope);
        // aki hay que poner el print en la pagina web, mientras solo le dearemos un console.log
        console.log(val.value);
        let value = val.value.toString();
        const salto = '\\n', barraInv = '\\\\', comillaD = '\\\"', tab = '\\t', comillaS = "\\\'"; 
        if (value.includes(salto)) {
            value = value.replace(salto, '\n');
        }
        if (value.includes(barraInv)) {
            value = value.replace(barraInv, '\\');
        }
        if (value.includes(comillaD)) {
            value = value.replace(comillaD, '\"');
        } 
        if (value.includes(tab)) {
            value = value.replace(tab, '\t');
        } 
        if (value.includes(comillaS)) {
            value = value.replace(comillaS, '\'');
        }
        return { output:value, transferencia: null, retorno: null };
    }
}

export class Println extends Instruccion {
    constructor(private value: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const val = this.value.ejecutar(scope);
        // aki hay que poner el print en la pagina web, mientras solo le dearemos un console.log
        console.log(val.value);
        let value = val.value.toString();
        const salto = '\\n', barraInv = '\\\\', comillaD = '\\\"', tab = '\\t', comillaS = "\\\'"; 
        if (value.includes(salto)) {
            value = value.replace(salto, '\n');
        }
        if (value.includes(barraInv)) {
            value = value.replace(barraInv, '\\');
        }
        if (value.includes(comillaD)) {
            value = value.replace(comillaD, '\"');
        } 
        if (value.includes(tab)) {
            value = value.replace(tab, '\t');
        } 
        if (value.includes(comillaS)) {
            value = value.replace(comillaS, '\'');
        }
        return { output:value + "\n", transferencia: null, retorno: null };
    }
}