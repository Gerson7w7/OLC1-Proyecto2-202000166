
instruccion
    | llamada_funcion PUNTO_COMA
    | do
    | transferencia  
    | funciones
    | imprimir
    | RUN llamada_funcion PUNTO_COMA
;

expresion
    | incremento_decremento
    | llamada_funcion
    | TOUPPER PARENTESIS_ABRE expresion PARENTESIS_CIERRA   
    | TOLOWER PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | ROUND PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | LENGHT PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | TYPEOF PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | TOSTRING PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | TOCHARARRAY PARENTESIS_ABRE expresion PARENTESIS_CIERRA
;

do
    : DO bloque WHILE PARENTESIS_ABRE condiciones PARENTESIS_CIERRA PUNTO_COMA
;

for 
    : FOR PARENTESIS_ABRE for1 PARENTESIS_CIERRA bloque
;

for1
    : declaracion PUNTO_COMA condiciones PUNTO_COMA instruccion
    | asignacion_simple PUNTO_COMA condiciones PUNTO_COMA instruccion
;

transferencia 
    : BREAK DOS_PUNTOS
    | CONTINUE DOS_PUNTOS   
    | RETURN expresion DOS_PUNTOS
;

llamada_funcion
    : IDENTIFICADOR PARENTESIS_ABRE argumentos PARENTESIS_CIERRA
    | IDENTIFICADOR PARENTESIS_ABRE PARENTESIS_CIERRA
;

argumentos
    : expresion COMA argumentos
    | expresion
;

funciones
    : IDENTIFICADOR PARENTESIS_ABRE parametros retorno_funcion bloque
;

parametros
    : parametros2 PARENTESIS_CIERRA
    | PARENTESIS_CIERRA
;

parametros2
    : tipo IDENTIFICADOR COMA parametros2
    | tipo IDENTIFICADOR
;

retorno_funcion
    : DOS_PUNTOS tipo
    | DOS_PUNTOS VOID
;

