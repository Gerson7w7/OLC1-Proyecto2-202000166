import { _Error } from "../Error/_Error";
import { Scope } from "../Extra/Scope";
import { LlamadaFuncion } from "../Intrucciones/LlamadaFuncion";
import { Expresion } from "./Expresion";
import { Retorno, Tipo } from "./Retorno";

export class Aritmetica extends Expresion {
    constructor(private izquierda: Expresion | LlamadaFuncion, private derecha: Expresion | LlamadaFuncion, private tipo: TipoAritmetica, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        // valores de las expresiones 
        let valorIzquierda: Retorno;
        let valorDerecha: Retorno;
        let flagIzq: string = null, flagDer: string = null;
        if (this.izquierda instanceof LlamadaFuncion) {
            const funIzquierda = this.izquierda.ejecutar(scope);
            console.log("output:: " + funIzquierda.retorno.output)
            if (funIzquierda.retorno != null) {
                valorIzquierda = funIzquierda.retorno;
                if (funIzquierda.output != null) {
                    flagIzq = funIzquierda.output;
                }
            }
        } else {
            valorIzquierda = this.izquierda.ejecutar(scope);
        }
        if (this.derecha instanceof LlamadaFuncion) {
            const funDerecha = this.derecha.ejecutar(scope);
            if (funDerecha.retorno != null) {
                valorDerecha = funDerecha.retorno;
                if (funDerecha.output != null) {
                    flagIzq = funDerecha.output
                }
            }
        } else {
            valorDerecha = this.derecha.ejecutar(scope);
        }

        let dominante;
        if (this.tipo == TipoAritmetica.SUMA) {           
            dominante = this.tipoDominanteSuma(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.ENTERO, output: null };
                } else {
                    if(flagIzq == null) {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.ENTERO, output: flagDer };
                    } else if(flagDer == null) {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.ENTERO, output: flagIzq };
                    } else {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.ENTERO, output: flagIzq + flagDer };
                    }
                }
            } else if (dominante == Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.DECIMAL, output: null };
                } else {
                    if(flagIzq == null) {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.DECIMAL, output: flagDer };
                    } else if(flagDer == null) {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.DECIMAL, output: flagIzq };
                    } else {
                        return { value: (valorIzquierda.value + valorDerecha.value), type: Tipo.DECIMAL, output: flagIzq + flagDer };
                    }
                }
            } else if (dominante == Tipo.CADENA) {
                return { value: (valorIzquierda.value.toString() + valorDerecha.value.toString()), type: Tipo.CADENA, output: flagIzq + flagDer };
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador +.");
            }
        } else if (this.tipo == TipoAritmetica.RESTA) {
            dominante = this.tipoDominanteResta(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value - valorDerecha.value), type: Tipo.ENTERO, output: null };
                } else {
                    if(flagIzq == null) {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Tipo.ENTERO, output: flagDer };
                    } else if(flagDer == null) {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Tipo.ENTERO, output: flagIzq };
                    } else {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Tipo.ENTERO, output: flagIzq + flagDer };
                    }
                }
            } else if (dominante == Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value - valorDerecha.value), type: Tipo.DECIMAL, output: null };
                } else {
                    if(flagIzq == null) {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Tipo.DECIMAL, output: flagDer };
                    } else if(flagDer == null) {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Tipo.DECIMAL, output: flagIzq };
                    } else {
                        return { value: (valorIzquierda.value - valorDerecha.value), type: Tipo.DECIMAL, output: flagIzq + flagDer };
                    }
                }
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador -.");
            }
        } else if (this.tipo == TipoAritmetica.MULTIPLICACION) {
            dominante = this.tipoDominanteMultiplicacion(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value * valorDerecha.value), type: Tipo.ENTERO, output: null };
                } else {
                    if(flagIzq == null) {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Tipo.ENTERO, output: flagDer };
                    } else if(flagDer == null) {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Tipo.ENTERO, output: flagIzq };
                    } else {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Tipo.ENTERO, output: flagIzq + flagDer };
                    }
                }
            } else if (dominante == Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value * valorDerecha.value), type: Tipo.DECIMAL, output: null };
                } else {
                    if(flagIzq == null) {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Tipo.DECIMAL, output: flagDer };
                    } else if(flagDer == null) {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Tipo.DECIMAL, output: flagIzq };
                    } else {
                        return { value: (valorIzquierda.value * valorDerecha.value), type: Tipo.DECIMAL, output: flagIzq + flagDer };
                    }
                }
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador *.");
            }
        } else if (this.tipo == TipoAritmetica.DIVISION) {
            dominante = this.tipoDominanteDivision(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (valorDerecha.value != 0) {
                    
                    if (flagIzq == null && flagDer == null) {
                        return { value: (valorIzquierda.value / valorDerecha.value), type: Tipo.ENTERO, output: null };
                    } else {
                        if(flagIzq == null) {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Tipo.ENTERO, output: flagDer };
                        } else if(flagDer == null) {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Tipo.ENTERO, output: flagIzq };
                        } else {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Tipo.ENTERO, output: flagIzq + flagDer };
                        }
                    }
                }
                throw new _Error(this.linea, this.columna, "Semántico", "Valor indeterminado. No se puede operar " + valorIzquierda.value + " entre 0.");
            } else if (dominante == Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                if (valorDerecha.value != 0) {
                    
                    if (flagIzq == null && flagDer == null) {
                        return { value: (valorIzquierda.value / valorDerecha.value), type: Tipo.DECIMAL, output: null };
                    } else {
                        if(flagIzq == null) {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Tipo.DECIMAL, output: flagDer };
                        } else if(flagDer == null) {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Tipo.DECIMAL, output: flagIzq };
                        } else {
                            return { value: (valorIzquierda.value / valorDerecha.value), type: Tipo.DECIMAL, output: flagIzq + flagDer };
                        }
                    }
                }
                throw new _Error(this.linea, this.columna, "Semántico", "Valor indeterminado. No se puede operar " + valorIzquierda.value + " entre 0.");
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador /.");
            }
        } else if (this.tipo == TipoAritmetica.POTENCIA) {
            dominante = this.tipoDominantePotencia(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                
                if (flagIzq == null && flagDer == null) {
                    return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Tipo.ENTERO, output: null };
                } else {
                    if(flagIzq == null) {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Tipo.ENTERO, output: flagDer };
                    } else if(flagDer == null) {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Tipo.ENTERO, output: flagIzq };
                    } else {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Tipo.ENTERO, output: flagIzq + flagDer };
                    }
                }
            } else if (dominante == Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                
                if (flagIzq == null && flagDer == null) {
                    return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Tipo.DECIMAL, output: null };
                } else {
                    if(flagIzq == null) {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Tipo.DECIMAL, output: flagDer };
                    } else if(flagDer == null) {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Tipo.DECIMAL, output: flagIzq };
                    } else {
                        return { value: (Math.pow(valorIzquierda.value, valorDerecha.value)), type: Tipo.DECIMAL, output: flagIzq + flagDer };
                    }
                }
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador ^.");
            }
        } else if (this.tipo == TipoAritmetica.MODULO) {
            dominante = this.tipoDominanteModulo(valorIzquierda.type, valorDerecha.type);
            if (dominante == Tipo.ENTERO) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value % valorDerecha.value), type: Tipo.ENTERO, output: null };
                } else {
                    if(flagIzq == null) {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Tipo.ENTERO, output: flagDer };
                    } else if(flagDer == null) {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Tipo.ENTERO, output: flagIzq };
                    } else {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Tipo.ENTERO, output: flagIzq + flagDer };
                    }
                }
            } else if (dominante == Tipo.DECIMAL) {
                valorIzquierda.value = this.convertirNumero(valorIzquierda.value);
                valorDerecha.value = this.convertirNumero(valorDerecha.value);
                
                if (flagIzq == null && flagDer == null) {
                    return { value: (valorIzquierda.value % valorDerecha.value), type: Tipo.DECIMAL, output: null };
                } else {
                    if(flagIzq == null) {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Tipo.DECIMAL, output: flagDer };
                    } else if(flagDer == null) {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Tipo.DECIMAL, output: flagIzq };
                    } else {
                        return { value: (valorIzquierda.value % valorDerecha.value), type: Tipo.DECIMAL, output: flagIzq + flagDer };
                    }
                }
            } else {
                throw new _Error(this.linea, this.columna, "Semántico", "Tipos incompatibles. No se puede operar " + valorIzquierda.value + " y " + valorDerecha.value + " con el operador %.");
            }
        }
        throw new _Error(this.linea, this.columna, "Semántico", "Error");
    }

    public convertirNumero(value: any): number {
        if (typeof(value) === 'string') {
            value = value.charCodeAt(0);
        } else if (typeof(value) === 'boolean') {
            if (value == true) {
                value = 1;
            } else {
                value = 0;
            }
        }
        return value;
    }
}

export enum TipoAritmetica {
    SUMA,
    RESTA,
    MULTIPLICACION,
    DIVISION,
    POTENCIA,
    MODULO
}