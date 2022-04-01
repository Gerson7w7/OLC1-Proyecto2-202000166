"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dominanteModulo = exports.dominantePotencia = exports.dominanteDivision = exports.dominanteMultiplicacion = exports.dominanteResta = exports.dominanteSuma = exports.Tipo = void 0;
var Tipo;
(function (Tipo) {
    Tipo[Tipo["ENTERO"] = 0] = "ENTERO";
    Tipo[Tipo["DECIMAL"] = 1] = "DECIMAL";
    Tipo[Tipo["BOOLEAN"] = 2] = "BOOLEAN";
    Tipo[Tipo["CARACTER"] = 3] = "CARACTER";
    Tipo[Tipo["CADENA"] = 4] = "CADENA";
    Tipo[Tipo["ERROR"] = 5] = "ERROR";
})(Tipo = exports.Tipo || (exports.Tipo = {}));
exports.dominanteSuma = [
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ENTERO, Tipo.ENTERO, Tipo.CADENA],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.DECIMAL, Tipo.DECIMAL, Tipo.CADENA],
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.CADENA],
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.CADENA, Tipo.CADENA],
    [Tipo.CADENA, Tipo.CADENA, Tipo.CADENA, Tipo.CADENA, Tipo.CADENA]
];
exports.dominanteResta = [
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ENTERO, Tipo.ENTERO, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR],
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR]
];
exports.dominanteMultiplicacion = [
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ENTERO, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR]
];
exports.dominanteDivision = [
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR]
];
exports.dominantePotencia = [
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR]
];
exports.dominanteModulo = [
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR]
];
//# sourceMappingURL=Retorno.js.map