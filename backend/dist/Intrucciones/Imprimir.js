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
        return { output: value, transferencia: null, retorno: null };
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
        return { output: value + "\n", transferencia: null, retorno: null };
    }
}
exports.Println = Println;
//# sourceMappingURL=Imprimir.js.map