import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";

export class Bloque extends Instruccion {
    constructor(private codigo: Instruccion[], linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const newScope = new Scope(scope);
        let salida: string = "";
        for (const instruccion of this.codigo) {
            try {
                if (instruccion instanceof Array) {
                    for (const inst2 of instruccion) {
                        inst2.ejecutar(scope);
                    }
                } else {
                    const retorno = instruccion.ejecutar(newScope);
                    if (retorno != null && retorno != undefined) {
                        if (retorno.transferencia != null) {
                            // retorno tanto la salida, como la tranferencia
                            if (retorno.output != null) {
                                salida += retorno.output;
                            }
                            return { output: salida, transferencia: { type:retorno.transferencia.type, linea:retorno.transferencia.linea, columna:retorno.transferencia.columna} };
                        } else if (retorno.output != null) {
                            salida += retorno.output;
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                salida += `Error ${error.tipo}: ${error.mensaje} en la linea: ${error.linea}, columna: ${error.columna}\n`;
            }
        }
        return { output: salida, transferencia: null };
    }
}