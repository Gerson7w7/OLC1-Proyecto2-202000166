import { Scope } from "../Extra/Scope";
import * as retorno from "./Retorno";

export abstract class Expresion {
    public linea: number;
    public columna: number;

    constructor(linea: number, columna: number) {
        this.linea = linea;
        this.columna = columna;
    }

    public abstract ejecutar(scope: Scope): retorno.Retorno;

    public tipoDominanteSuma(tipo1: retorno.Tipo, tipo2: retorno.Tipo): retorno.Tipo {
        return retorno.dominanteSuma[tipo1][tipo2];
    }
    public tipoDominanteResta(tipo1: retorno.Tipo, tipo2: retorno.Tipo): retorno.Tipo {
        return retorno.dominanteResta[tipo1][tipo2];
    }
    public tipoDominanteMultiplicacion(tipo1: retorno.Tipo, tipo2: retorno.Tipo): retorno.Tipo {
        return retorno.dominanteMultiplicacion[tipo1][tipo2];
    }
    public tipoDominanteDivision(tipo1: retorno.Tipo, tipo2: retorno.Tipo): retorno.Tipo {
        return retorno.dominanteDivision[tipo1][tipo2];
    }
    public tipoDominantePotencia(tipo1: retorno.Tipo, tipo2: retorno.Tipo): retorno.Tipo {
        return retorno.dominantePotencia[tipo1][tipo2];
    }
    public tipoDominanteModulo(tipo1: retorno.Tipo, tipo2: retorno.Tipo): retorno.Tipo {
        return retorno.dominanteModulo[tipo1][tipo2];
    }
}