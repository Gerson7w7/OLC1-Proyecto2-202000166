"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoTransferencia = exports.Continue = exports.Break = void 0;
const Instruccion_1 = require("./Instruccion");
class Break extends Instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(scope) {
        const retorno = { output: null, transferencia: { type: TipoTransferencia.BREAK, linea: this.linea, columna: this.columna } };
        return retorno;
    }
}
exports.Break = Break;
class Continue extends Instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(scope) {
        const retorno = { output: null, transferencia: { type: TipoTransferencia.CONTINUE, linea: this.linea, columna: this.columna } };
        return retorno;
    }
}
exports.Continue = Continue;
var TipoTransferencia;
(function (TipoTransferencia) {
    TipoTransferencia[TipoTransferencia["BREAK"] = 0] = "BREAK";
    TipoTransferencia[TipoTransferencia["CONTINUE"] = 1] = "CONTINUE";
    TipoTransferencia[TipoTransferencia["RETURN"] = 2] = "RETURN";
})(TipoTransferencia = exports.TipoTransferencia || (exports.TipoTransferencia = {}));
//# sourceMappingURL=Transferencias.js.map