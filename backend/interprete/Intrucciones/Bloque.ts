import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { Funcion } from "./Funcion";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";
import { Run } from "./Run";

export class Bloque extends Instruccion {
    constructor(private codigo: Instruccion[], linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const newScope = new Scope(scope);
        let salida: string = "";
        let sinErrores = true;
        let lista_errores = [];
        for (const instruccion of this.codigo) {
            try {
                if (instruccion instanceof _Error) {
                    sinErrores = false;
                    lista_errores.push(instruccion);
                    salida += `Error ${instruccion.tipo}: en linea: ${instruccion.linea}, columna: ${instruccion.columna}. ${instruccion.mensaje}\n`;
                } else if (instruccion instanceof Array) {
                    for (const inst2 of instruccion) {
                        inst2.ejecutar(scope);
                    }
                } else if (instruccion instanceof Run) {
                    throw new _Error(this.linea, this.columna, "Semántico", "RUN solo se puede ejecutar en el ámbito global.");
                } else if (instruccion instanceof Funcion) {
                    throw new _Error(this.linea, this.columna, "Semántico", "Una FUNCIÓN solo se puede declarar en el ámbito global.");
                } else {
                    console.log(instruccion);
                    const retorno = instruccion.ejecutar(newScope);
                    if (retorno != null && retorno != undefined) {
                        if (retorno.transferencia != null) {
                            // retorno tanto la salida, como la tranferencia
                            if (retorno.output != null && sinErrores) {
                                if (sinErrores) salida += retorno.output;
                                if (retorno.retorno != null && retorno.retorno.output != null) {
                                    if (sinErrores) salida += retorno.retorno.output;
                                }
                            }
                            return { output: salida, transferencia: retorno.transferencia, retorno: retorno.retorno };
                        } else if (retorno.output != null && sinErrores) {
                            if (sinErrores) salida += retorno.output;
                            if (retorno.retorno != null && retorno.retorno.output != null) {
                                if (sinErrores) salida += retorno.retorno.output;
                            }
                        }
                    }
                }
            } catch (error) {
                sinErrores = false;
                console.log(error);
                if (error.output != undefined && error.output != null) {
                    lista_errores = lista_errores.concat(error.errores);
                    salida += error.output;
                } else {
                    lista_errores.push(error);
                    salida += `Error ${error.tipo}: ${error.mensaje} en la linea: ${error.linea}, columna: ${error.columna}\n`;
                }
            }
        }
        if (!sinErrores) {
            console.log("ERRORES BLOQUE:" +lista_errores);
            throw { errores: lista_errores, output: salida };
        }
        return { output: salida, transferencia: null, retorno: null };
    }
}