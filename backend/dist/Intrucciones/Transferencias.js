"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoTransferencia = exports.Return = exports.Continue = exports.Break = void 0;
const Expresion_1 = require("../Expresion/Expresion");
const Instruccion_1 = require("./Instruccion");
class Break extends Instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(scope) {
        const retorno = { output: null, transferencia: { type: TipoTransferencia.BREAK, linea: this.linea, columna: this.columna }, retorno: null };
        return retorno;
    }
}
exports.Break = Break;
class Continue extends Instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(scope) {
        const retorno = { output: null, transferencia: { type: TipoTransferencia.CONTINUE, linea: this.linea, columna: this.columna }, retorno: null };
        return retorno;
    }
}
exports.Continue = Continue;
class Return extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    ejecutar(scope) {
        if (this.expresion != null) {
            if (this.expresion instanceof Expresion_1.Expresion) {
                const val = this.expresion.ejecutar(scope);
                const retorno = { output: val.output, transferencia: { type: TipoTransferencia.RETURN, linea: this.linea, columna: this.columna }, retorno: val };
                return retorno;
            }
            else {
                // retorno de la función
                const valFuncion = this.expresion.ejecutar(scope);
                if (valFuncion.retorno != null) {
                    const retorno = { output: valFuncion.output, transferencia: valFuncion.transferencia, retorno: valFuncion.retorno };
                    return retorno;
                }
                const retorno = { output: valFuncion.output, transferencia: valFuncion.transferencia, retorno: null };
                return retorno;
            }
        }
        const retorno = { output: null, transferencia: { type: TipoTransferencia.RETURN, linea: this.linea, columna: this.columna }, retorno: null };
        return retorno;
    }
}
exports.Return = Return;
var TipoTransferencia;
(function (TipoTransferencia) {
    TipoTransferencia[TipoTransferencia["BREAK"] = 0] = "BREAK";
    TipoTransferencia[TipoTransferencia["CONTINUE"] = 1] = "CONTINUE";
    TipoTransferencia[TipoTransferencia["RETURN"] = 2] = "RETURN";
})(TipoTransferencia = exports.TipoTransferencia || (exports.TipoTransferencia = {}));
//# sourceMappingURL=Transferencias.js.map