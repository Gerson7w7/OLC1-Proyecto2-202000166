"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
const retorno = require("./Retorno");
class Expresion {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    tipoDominanteSuma(tipo1, tipo2) {
        return retorno.dominanteSuma[tipo1][tipo2];
    }
    tipoDominanteResta(tipo1, tipo2) {
        return retorno.dominanteResta[tipo1][tipo2];
    }
    tipoDominanteMultiplicacion(tipo1, tipo2) {
        return retorno.dominanteMultiplicacion[tipo1][tipo2];
    }
    tipoDominanteDivision(tipo1, tipo2) {
        return retorno.dominanteDivision[tipo1][tipo2];
    }
    tipoDominantePotencia(tipo1, tipo2) {
        return retorno.dominantePotencia[tipo1][tipo2];
    }
    tipoDominanteModulo(tipo1, tipo2) {
        return retorno.dominanteModulo[tipo1][tipo2];
    }
}
exports.Expresion = Expresion;
//# sourceMappingURL=Expresion.js.map