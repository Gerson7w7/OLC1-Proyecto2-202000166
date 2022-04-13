import { Scope } from "../Extra/Scope";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";

export class Break extends Instruccion {
    constructor (linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const retorno = { output: null, transferencia: { type: TipoTransferencia.BREAK, linea: this.linea, columna: this.columna } } 
        return retorno;
    }
}

export class Continue extends Instruccion {
    constructor (linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const retorno = { output: null, transferencia: { type: TipoTransferencia.CONTINUE, linea: this.linea, columna: this.columna } } 
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