"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const Scope_1 = require("../Extra/Scope");
const Instruccion_1 = require("./Instruccion");
class Bloque extends Instruccion_1.Instruccion {
    constructor(codigo, linea, columna) {
        super(linea, columna);
        this.codigo = codigo;
    }
    ejecutar(scope) {
        const newScope = new Scope_1.Scope(scope);
        let salida = "";
        for (const instruccion of this.codigo) {
            try {
                if (instruccion instanceof Array) {
                    for (const inst2 of instruccion) {
                        inst2.ejecutar(scope);
                    }
                }
                else {
                    const retorno = instruccion.ejecutar(newScope);
                    if (retorno != null && retorno != undefined) {
                        if (retorno.transferencia != null) {
                            // retorno tanto la salida, como la tranferencia
                            if (retorno.output != null) {
                                salida += retorno.output;
                            }
                            return { output: salida, transferencia: retorno.transferencia, retorno: retorno.retorno };
                        }
                        else if (retorno.output != null) {
                            salida += retorno.output;
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
                salida += `Error ${error.tipo}: ${error.mensaje} en la linea: ${error.linea}, columna: ${error.columna}\n`;
            }
        }
        return { output: salida, transferencia: null, retorno: null };
    }
}
exports.Bloque = Bloque;
//# sourceMappingURL=Bloque.js.map