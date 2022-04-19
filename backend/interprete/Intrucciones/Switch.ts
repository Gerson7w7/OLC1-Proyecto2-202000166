import { Expresion } from "../Expresion/Expresion";
import { Scope } from "../Extra/Scope";
import { Bloque } from "./Bloque";
import { Instruccion } from "./Instruccion";
import { Retorno } from "./Retorno";
import { Relacional, TipoRelacional } from "../Expresion/Relacional";
import { TipoTransferencia } from "./Transferencias";

export class Switch extends Instruccion {
    constructor(private condicion: Expresion, private case_list: Case[], private _default: Default, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        let salida: string = "";
        let sinBreak = false, usarDefault = true;
        if (this.case_list != null) {
            // cases del switch
            for (const _case of this.case_list) {
                // verificando si se cumple la igualdad del switch con el case y si son compatibles
                const comparacion = new Relacional(this.condicion, _case.comparar(), TipoRelacional.IGUAL, this.linea, this.columna).ejecutar(scope);
                if (comparacion.value || sinBreak) {
                    usarDefault = false;
                    // ejecutando las instrucciones del case
                    const resultado = _case.ejecutar(scope);

                    if (resultado != null && resultado != undefined) {
                        if (resultado.transferencia != null) {
                            if (resultado.transferencia.type == TipoTransferencia.BREAK) {
                                if (resultado.output != null) {
                                    salida += resultado.output;
                                }
                                // como encontro el break, se saldrá del switch y no ejecutará el default
                                sinBreak = false;
                                break;
                            } else if (resultado.transferencia.type == TipoTransferencia.CONTINUE) {
                                if (resultado.output != null) {
                                    salida += resultado.output;
                                }
                                return { output: salida, transferencia: resultado.transferencia, retorno: resultado.retorno };
                            }
                        } else if (resultado.output != null) {
                            // si no hay break se ejecutaran los cases faltantes hasta encontrar un break o el default
                            sinBreak = true;
                            salida += resultado.output;
                        }
                    }
                }
            }
        }
        if (this._default != null) {
            // ejecutando el default cuando sea necesario 
            if (usarDefault || sinBreak) {
                const resultado = this._default.ejecutar(scope);
                if (resultado != null && resultado != undefined) {
                    if (resultado.transferencia != null) {
                        if (resultado.transferencia.type != TipoTransferencia.BREAK) {
                            if (resultado.output != null) {
                                salida += resultado.output;
                            }
                            
                            return { output: salida, transferencia: resultado.transferencia, retorno: resultado.retorno };
                        } else if (resultado.output != null) {
                            salida += resultado.output;
                        }
                    } else if (resultado.output != null) {
                        salida += resultado.output;
                    }
                }
            }
        }
        return { output: salida, transferencia: null, retorno: null };
    }
}

export class Case extends Instruccion {
    constructor(private condicion: Expresion, private instrucciones: Instruccion[], linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const bloque = new Bloque(this.instrucciones, this.linea, this.columna);
        return bloque.ejecutar(scope);
    }

    public comparar(): Expresion {
        return this.condicion;
    }
}

export class Default extends Instruccion {
    constructor(private instrucciones: Instruccion[], linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const bloque = new Bloque(this.instrucciones, this.linea, this.columna);
        return bloque.ejecutar(scope);
    }
}