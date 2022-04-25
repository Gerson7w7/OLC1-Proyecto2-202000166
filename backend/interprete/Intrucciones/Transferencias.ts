import { Expresion } from "../Expresion/Expresion";
import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { LlamadaFuncion } from "./LlamadaFuncion";
import { Retorno } from "./Retorno";

export class Break extends Instruccion {
    constructor (linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const retorno = { output: null, transferencia: { type: TipoTransferencia.BREAK, linea: this.linea, columna: this.columna }, retorno: null } 
        return retorno;
    }
}

export class Continue extends Instruccion {
    constructor (linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const retorno = { output: null, transferencia: { type: TipoTransferencia.CONTINUE, linea: this.linea, columna: this.columna }, retorno: null } 
        return retorno;
    }
}

export class Return extends Instruccion {
    constructor(private expresion: Expresion | LlamadaFuncion, linea:number, columna:number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        if (this.expresion != null) {
            if (this.expresion instanceof Expresion) {
                const val = this.expresion.ejecutar(scope);
                const retorno = { output: val.output, transferencia: { type: TipoTransferencia.RETURN, linea: this.linea, columna: this.columna }, retorno: val } 
                return retorno;
            } else {
                // retorno de la función
                const valFuncion = this.expresion.ejecutar(scope);
                if (valFuncion.retorno != null) {
                    const retorno = { output: valFuncion.output, transferencia: valFuncion.transferencia, retorno: valFuncion.retorno } 
                    return retorno;
                }
                const retorno = { output: valFuncion.output, transferencia: valFuncion.transferencia, retorno: null } 
                return retorno;
            }
        } 
        const retorno = { output: null, transferencia: { type: TipoTransferencia.RETURN, linea: this.linea, columna: this.columna }, retorno: null } 
        return retorno;
    }
}

export type transferencia = {
    type: TipoTransferencia,
    linea: number,
    columna: number
}

export enum TipoTransferencia {
    BREAK,
    CONTINUE,
    RETURN
}