
export enum Tipo {
    ENTERO,
    DECIMAL,
    BOOLEAN,
    CARACTER,
    CADENA,
    ERROR
}

export type Retorno = {
    value: any,
    type: Tipo
    output: string;
}

export const dominanteSuma = [
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ENTERO, Tipo.ENTERO, Tipo.CADENA],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.DECIMAL, Tipo.DECIMAL, Tipo.CADENA],
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.CADENA],
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.CADENA, Tipo.CADENA],
    [Tipo.CADENA, Tipo.CADENA, Tipo.CADENA, Tipo.CADENA, Tipo.CADENA]
];

export const dominanteResta = [
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ENTERO, Tipo.ENTERO, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR],
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR]
];

export const dominanteMultiplicacion = [
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ENTERO, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR]
];

export const dominanteDivision = [
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.DECIMAL, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR]
];

export const dominantePotencia = [
    [Tipo.ENTERO, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR]
];

export const dominanteModulo = [
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.DECIMAL, Tipo.DECIMAL, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR],
    [Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR, Tipo.ERROR]
];