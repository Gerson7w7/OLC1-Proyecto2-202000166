"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const _Error_1 = require("../Error/_Error");
const Scope_1 = require("../Extra/Scope");
const Funcion_1 = require("./Funcion");
const Instruccion_1 = require("./Instruccion");
const Run_1 = require("./Run");
class Bloque extends Instruccion_1.Instruccion {
    constructor(codigo, linea, columna) {
        super(linea, columna);
        this.codigo = codigo;
    }
    ejecutar(scope) {
        const newScope = new Scope_1.Scope(scope);
        let salida = "";
        let sinErrores = true;
        let lista_errores = [];
        for (const instruccion of this.codigo) {
            try {
                if (instruccion instanceof _Error_1._Error) {
                    sinErrores = false;
                    lista_errores.push(instruccion);
                    salida += `Error ${instruccion.tipo}: en linea: ${instruccion.linea}, columna: ${instruccion.columna}. ${instruccion.mensaje}\n`;
                }
                else if (instruccion instanceof Array) {
                    for (const inst2 of instruccion) {
                        inst2.ejecutar(scope);
                    }
                }
                else if (instruccion instanceof Run_1.Run) {
                    throw new _Error_1._Error(this.linea, this.columna, "Semántico", "RUN solo se puede ejecutar en el ámbito global.");
                }
                else if (instruccion instanceof Funcion_1.Funcion) {
                    throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Una FUNCIÓN solo se puede declarar en el ámbito global.");
                }
                else {
                    console.log(instruccion);
                    const retorno = instruccion.ejecutar(newScope);
                    if (retorno != null && retorno != undefined) {
                        if (retorno.transferencia != null) {
                            // retorno tanto la salida, como la tranferencia
                            if (retorno.output != null && sinErrores) {
                                if (sinErrores)
                                    salida += retorno.output;
                                if (retorno.retorno != null && retorno.retorno.output != null) {
                                    if (sinErrores)
                                        salida += retorno.retorno.output;
                                }
                            }
                            return { output: salida, transferencia: retorno.transferencia, retorno: retorno.retorno };
                        }
                        else if (retorno.output != null && sinErrores) {
                            if (sinErrores)
                                salida += retorno.output;
                            if (retorno.retorno != null && retorno.retorno.output != null) {
                                if (sinErrores)
                                    salida += retorno.retorno.output;
                            }
                        }
                    }
                }
            }
            catch (error) {
                sinErrores = false;
                console.log(error);
                if (error.output != undefined && error.output != null) {
                    lista_errores = lista_errores.concat(error.errores);
                    salida += error.output;
                }
                else {
                    lista_errores.push(error);
                    salida += `Error ${error.tipo}: ${error.mensaje} en la linea: ${error.linea}, columna: ${error.columna}\n`;
                }
            }
        }
        if (!sinErrores) {
            console.log("ERRORES BLOQUE:" + lista_errores);
            throw { errores: lista_errores, output: salida };
        }
        return { output: salida, transferencia: null, retorno: null };
    }
}
exports.Bloque = Bloque;
//# sourceMappingURL=Bloque.js.map