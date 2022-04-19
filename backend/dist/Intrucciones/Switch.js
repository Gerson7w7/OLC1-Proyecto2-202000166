"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = exports.Case = exports.Switch = void 0;
const Bloque_1 = require("./Bloque");
const Instruccion_1 = require("./Instruccion");
const Relacional_1 = require("../Expresion/Relacional");
const Transferencias_1 = require("./Transferencias");
class Switch extends Instruccion_1.Instruccion {
    constructor(condicion, case_list, _default, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.case_list = case_list;
        this._default = _default;
    }
    ejecutar(scope) {
        let salida = "";
        let sinBreak = false, usarDefault = true;
        if (this.case_list != null) {
            // cases del switch
            for (const _case of this.case_list) {
                // verificando si se cumple la igualdad del switch con el case y si son compatibles
                const comparacion = new Relacional_1.Relacional(this.condicion, _case.comparar(), Relacional_1.TipoRelacional.IGUAL, this.linea, this.columna).ejecutar(scope);
                if (comparacion.value || sinBreak) {
                    usarDefault = false;
                    // ejecutando las instrucciones del case
                    const resultado = _case.ejecutar(scope);
                    if (resultado != null && resultado != undefined) {
                        if (resultado.transferencia != null) {
                            if (resultado.transferencia.type == Transferencias_1.TipoTransferencia.BREAK) {
                                if (resultado.output != null) {
                                    salida += resultado.output;
                                }
                                // como encontro el break, se saldrá del switch y no ejecutará el default
                                sinBreak = false;
                                break;
                            }
                            else if (resultado.transferencia.type == Transferencias_1.TipoTransferencia.CONTINUE) {
                                if (resultado.output != null) {
                                    salida += resultado.output;
                                }
                                return { output: salida, transferencia: resultado.transferencia, retorno: resultado.retorno };
                            }
                        }
                        else if (resultado.output != null) {
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
                        if (resultado.transferencia.type != Transferencias_1.TipoTransferencia.BREAK) {
                            if (resultado.output != null) {
                                salida += resultado.output;
                            }
                            return { output: salida, transferencia: resultado.transferencia, retorno: resultado.retorno };
                        }
                        else if (resultado.output != null) {
                            salida += resultado.output;
                        }
                    }
                    else if (resultado.output != null) {
                        salida += resultado.output;
                    }
                }
            }
        }
        return { output: salida, transferencia: null, retorno: null };
    }
}
exports.Switch = Switch;
class Case extends Instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    ejecutar(scope) {
        const bloque = new Bloque_1.Bloque(this.instrucciones, this.linea, this.columna);
        return bloque.ejecutar(scope);
    }
    comparar() {
        return this.condicion;
    }
}
exports.Case = Case;
class Default extends Instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    ejecutar(scope) {
        const bloque = new Bloque_1.Bloque(this.instrucciones, this.linea, this.columna);
        return bloque.ejecutar(scope);
    }
}
exports.Default = Default;
//# sourceMappingURL=Switch.js.map