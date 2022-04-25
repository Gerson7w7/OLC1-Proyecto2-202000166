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
        const salto = '\\n', barraInv = '\\\\', comillaD = '\\\"', tab = '\\t', comillaS = "\\\'"; 
        if (val.value.includes(salto)) {
            val.value = val.value.replace(salto, '\n');
        }
        if (val.value.includes(barraInv)) {
            val.value = val.value.replace(barraInv, '\\');
        }
        if (val.value.includes(comillaD)) {
            val.value = val.value.replace(comillaD, '\"');
        } 
        if (val.value.includes(tab)) {
            val.value = val.value.replace(tab, '\t');
        } 
        if (val.value.includes(comillaS)) {
            val.value = val.value.replace(comillaS, '\'');
        }
        return { output:val.value, transferencia: null, retorno: null };
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
        const salto = '\\n', barraInv = '\\\\', comillaD = '\\\"', tab = '\\t', comillaS = "\\\'"; 
        if (val.value.includes(salto)) {
            val.value = val.value.replace(salto, '\n');
        }
        if (val.value.includes(barraInv)) {
            val.value = val.value.replace(barraInv, '\\');
        }
        if (val.value.includes(comillaD)) {
            val.value = val.value.replace(comillaD, '\"');
        } 
        if (val.value.includes(tab)) {
            val.value = val.value.replace(tab, '\t');
        } 
        if (val.value.includes(comillaS)) {
            val.value = val.value.replace(comillaS, '\'');
        }
        return { output:val.value + "\n", transferencia: null, retorno: null };
    }
}