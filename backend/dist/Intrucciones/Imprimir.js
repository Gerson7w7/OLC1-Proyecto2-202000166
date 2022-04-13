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
        return { output: val.value, transferencia: null };
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
        return { output: val.value + "\n", transferencia: null };
    }
}
exports.Println = Println;
//# sourceMappingURL=Imprimir.js.map