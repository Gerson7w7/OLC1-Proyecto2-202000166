"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAritmetica = exports.Aritmetica = void 0;
const _Error_1 = require("../Error/_Error");
const LlamadaFuncion_1 = require("../Intrucciones/LlamadaFuncion");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Aritmetica extends Expresion_1.Expresion {
    constructor(izquierda, derecha, tipo, linea, columna) {
        super(linea, columna);
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.tipo = tipo;
    }
    ejecutar(scope) {
        // valores de las expresiones 
        let valorIzquierda;
        let valorDerecha;
        let flagIzq = null, flagDer = null;
        if (this.izquierda instanceof LlamadaFuncion_1.LlamadaFuncion) {
            const funIzquierda = this.izquierda.ejecutar(scope);
            console.log("output:: " + funIzquierda.retorno.output);
            if (funIzquierda.retorno != null) {
                valorIzquierda = funIzquierda.retorno;
                if (funIzquierda.output != null) {
                    flagIzq = funIzquierda.output;
                }
            }
        }
        else {
            valorIzquierda = this.izquierda.ejecutar(scope);
        }
        if (this.derecha instanceof LlamadaFuncion_1.LlamadaFuncion) {
            const funDerecha = this.derecha.ejecutar(scope);
            if (funDerecha.retorno != null) {
                valorDerecha = funDerecha.retorno;
                if (funDerecha.output != null) {
                    flagIzq = funDerecha.output;
                }
            }
        }
        else {
            valorDerecha = this.derecha.ejecutar(scope);
        }
        let dominante;
        if (this.tipo == TipoAritmetica.SUMA) {
            dominante = this.tipoDominanteSuma(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value + valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: null };
                }
                else {
                    if (flagIzq == null) {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagDer };
                    }
                    else if (flagDer == null) {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagIzq };
                    }
                    else {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagIzq + flagDer };
                    }
                }
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value + valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: null };
                }
                else {
                    if (flagIzq == null) {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagDer };
                    }
                    else if (flagDer == null) {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagIzq };
                    }
                    else {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagIzq + flagDer };
                    }
                }
            }
            else if (dominante == Retorno_1.Tipo.CADENA) {
                return { value: (valorIzquierda.value.toString() + valorDerecha.value.toString()), type: Retorno_1.Tipo.CADENA, output: flagIzq + flagDer };
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador +.");
            }
        }
        else if (this.tipo == TipoAritmetica.RESTA) {
            dominante = this.tipoDominanteResta(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value - valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: null };
                }
                else {
                    if (flagIzq == null) {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagDer };
                    }
                    else if (flagDer == null) {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagIzq };
                    }
                    else {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagIzq + flagDer };
                    }
                }
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value - valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: null };
                }
                else {
                    if (flagIzq == null) {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagDer };
                    }
                    else if (flagDer == null) {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagIzq };
                    }
                    else {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagIzq + flagDer };
                    }
                }
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador -.");
            }
        }
        else if (this.tipo == TipoAritmetica.MULTIPLICACION) {
            dominante = this.tipoDominanteMultiplicacion(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value * valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: null };
                }
                else {
                    if (flagIzq == null) {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagDer };
                    }
                    else if (flagDer == null) {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagIzq };
                    }
                    else {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagIzq + flagDer };
                    }
                }
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value * valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: null };
                }
                else {
                    if (flagIzq == null) {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagDer };
                    }
                    else if (flagDer == null) {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagIzq };
                    }
                    else {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagIzq + flagDer };
                    }
                }
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador *.");
            }
        }
        else if (this.tipo == TipoAritmetica.DIVISION) {
            dominante = this.tipoDominanteDivision(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (valorDerecha.value != 0) {
                    if (flagIzq == null && flagDer == null) {
                        return { value: (valorIzquierda.value / valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: null };
                    }
                    else {
                        if (flagIzq == null) {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagDer };
                        }
                        else if (flagDer == null) {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagIzq };
                        }
                        else {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagIzq + flagDer };
                        }
                    }
                }
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Valor indeterminado. No se puede operar " + valorIzquierda.value + " entre 0.");
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (valorDerecha.value != 0) {
                    if (flagIzq == null && flagDer == null) {
                        return { value: (valorIzquierda.value / valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: null };
                    }
                    else {
                        if (flagIzq == null) {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagDer };
                        }
                        else if (flagDer == null) {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagIzq };
                        }
                        else {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagIzq + flagDer };
                        }
                    }
                }
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Valor indeterminado. No se puede operar " + valorIzquierda.value + " entre 0.");
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador /.");
            }
        }
        else if (this.tipo == TipoAritmetica.POTENCIA) {
            dominante = this.tipoDominantePotencia(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Retorno_1.Tipo.ENTERO, output: null };
                }
                else {
                    if (flagIzq == null) {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Retorno_1.Tipo.ENTERO, output: flagDer };
                    }
                    else if (flagDer == null) {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Retorno_1.Tipo.ENTERO, output: flagIzq };
                    }
                    else {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Retorno_1.Tipo.ENTERO, output: flagIzq + flagDer };
                    }
                }
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Retorno_1.Tipo.DECIMAL, output: null };
                }
                else {
                    if (flagIzq == null) {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Retorno_1.Tipo.DECIMAL, output: flagDer };
                    }
                    else if (flagDer == null) {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Retorno_1.Tipo.DECIMAL, output: flagIzq };
                    }
                    else {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Retorno_1.Tipo.DECIMAL, output: flagIzq + flagDer };
                    }
                }
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador ^.");
            }
        }
        else if (this.tipo == TipoAritmetica.MODULO) {
            dominante = this.tipoDominanteModulo(valorIzquierda.type, valorDerecha.type);
            if (dominante == Retorno_1.Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value % valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: null };
                }
                else {
                    if (flagIzq == null) {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagDer };
                    }
                    else if (flagDer == null) {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagIzq };
                    }
                    else {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Retorno_1.Tipo.ENTERO, output: flagIzq + flagDer };
                    }
                }
            }
            else if (dominante == Retorno_1.Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value % valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: null };
                }
                else {
                    if (flagIzq == null) {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagDer };
                    }
                    else if (flagDer == null) {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagIzq };
                    }
                    else {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Retorno_1.Tipo.DECIMAL, output: flagIzq + flagDer };
                    }
                }
            }
            else {
                throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador %.");
            }
        }
        throw new _Error_1._Error(this.linea, this.columna, "Semántico", "Error");
    }
    convertirNumero(value) {
        if (typeof (value) === 'string') {
            value = value.charCodeAt(0);
        }
        else if (typeof (value) === 'boolean') {
            if (value == true) {
                value = 1;
            }
            else {
                value = 0;
            }
        }
        return value;
    }
}
exports.Aritmetica = Aritmetica;
var TipoAritmetica;
(function (TipoAritmetica) {
    TipoAritmetica[TipoAritmetica["SUMA"] = 0] = "SUMA";
    TipoAritmetica[TipoAritmetica["RESTA"] = 1] = "RESTA";
    TipoAritmetica[TipoAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoAritmetica[TipoAritmetica["DIVISION"] = 3] = "DIVISION";
    TipoAritmetica[TipoAritmetica["POTENCIA"] = 4] = "POTENCIA";
    TipoAritmetica[TipoAritmetica["MODULO"] = 5] = "MODULO";
})(TipoAritmetica = exports.TipoAritmetica || (exports.TipoAritmetica = {}));
//# sourceMappingURL=Aritmetica.js.map