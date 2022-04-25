"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Println = exports.Print = void 0;
const Instruccion_1 = require("./Instruccion");
class Print extends Instruccion_1.Instruccion {
    constructor(value, linea, columna) {
        super(linea, columna);
        this.value = value;
    }
    ejecutar(scope) {
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
        return { output: val.value, transferencia: null, retorno: null };
    }
}
exports.Print = Print;
class Println extends Instruccion_1.Instruccion {
    constructor(value, linea, columna) {
        super(linea, columna);
        this.value = value;
    }
    ejecutar(scope) {
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
        return { output: val.value + "\n", transferencia: null, retorno: null };
    }
}
exports.Println = Println;
//# sourceMappingURL=Imprimir.js.map