
instruccion
    | ternario PUNTO_COMA
    | incremento_decremento PUNTO_COMA
    | llamada_funcion PUNTO_COMA
    | if
    | switch
    | do
    | while
    | for
    | transferencia  
    | funciones
    | imprimir
    | RUN llamada_funcion PUNTO_COMA
;

asignacion    
    | corchetes_vacios ASIGNACION asignacion_vector

;

corchetes_vacios
    : CORCHETE_ABRE CORCHETE_CIERRA corchetes_vacios
    | CORCHETE_ABRE CORCHETE_CIERRA
;

asignacion_vector 
    : NEW tipo new_corchetes    
    | corchetes_vector
;

new_corchetes
    : CORCHETE_ABRE expresion CORCHETE_CIERRA new_corchetes
    | CORCHETE_ABRE expresion CORCHETE_CIERRA
;

corchetes_vector
    : CORCHETE_ABRE expresion_vector CORCHETE_CIERRA
;

expresion_vector
    : expresion COMA expresion_vector
    | expresion
    | corchetes_vector COMA expresion_vector
    | corchetes_vector
;

asignacion_simple
    | IDENTIFICADOR new_corchetes ASIGNACION expresion
;

expresion
    : MENOS expresion %prec UNMENOS                         { $$ = new Aritmetica($2, new Literal("-1", TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column) } 
    | expresion SUMA expresion                              { $$ = new Aritmetica($1, $3, TipoAritmetica.SUMA, @1.first_line, @1.first_column) }
    | expresion RESTA expresion                             { $$ = new Aritmetica($1, $3, TipoAritmetica.RESTA, @1.first_line, @1.first_column) }
    | expresion MULTIPLICACION expresion                    { $$ = new Aritmetica($1, $3, TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column) }
    | expresion DIVISION expresion                          { $$ = new Aritmetica($1, $3, TipoAritmetica.DIVISION, @1.first_line, @1.first_column) }
    | expresion POTENCIA expresion                          { $$ = new Aritmetica($1, $3, TipoAritmetica.POTENCIA, @1.first_line, @1.first_column) }
    | expresion MODULO expresion                            { $$ = new Aritmetica($1, $3, TipoAritmetica.MODULO, @1.first_line, @1.first_column) }
    | PARENTESIS_ABRE expresion PARENTESIS_CIERRA           { $$ = $2}
    | casteo expresion
    | incremento_decremento
    | llamada_funcion
    | ENTERO                                                { $$ = new Literal($1, TipoLiteral.ENTERO, @1.first_line, @1.first_column) }
    | DECIMAL                                               { $$ = new Literal($1, TipoLiteral.DECIMAL, @1.first_line, @1.first_column) }
    | TRUE                                                  { $$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line, @1.first_column) }
    | FALSE                                                 { $$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line, @1.first_column) }
    | CARACTER                                              { $$ = new Literal($1, TipoLiteral.CARACTER, @1.first_line, @1.first_column) }
    | CADENA                                                { $$ = new Literal($1, TipoLiteral.CADENA, @1.first_line, @1.first_column) }
    | IDENTIFICADOR
    | IDENTIFICADOR new_corchetes
    | TOUPPER PARENTESIS_ABRE expresion PARENTESIS_CIERRA   
    | TOLOWER PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | ROUND PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | LENGHT PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | TYPEOF PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | TOSTRING PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | TOCHARARRAY PARENTESIS_ABRE expresion PARENTESIS_CIERRA
;

incremento_decremento
    : expresion SUMA SUMA
    | expresion RESTA RESTA 
;

condicion
    : expresion IGUAL expresion                             { $$ = new Relacional($1, $3, TipoRelacional.IGUAL, @1.first_line, @1.first_column) }
    | expresion DESIGUAL expresion                          { $$ = new Relacional($1, $3, TipoRelacional.DESIGUAL, @1.first_line, @1.first_column) }
    | expresion MENOR expresion                             { $$ = new Relacional($1, $3, TipoRelacional.MENOR, @1.first_line, @1.first_column) }
    | expresion MENOR_IGUAL expresion                       { $$ = new Relacional($1, $3, TipoRelacional.MENOR_IGUAL, @1.first_line, @1.first_column) }
    | expresion MAYOR expresion                             { $$ = new Relacional($1, $3, TipoRelacional.MAYOR, @1.first_line, @1.first_column) }
    | expresion MAYOR_IGUAL expresion                       { $$ = new Relacional($1, $3, TipoRelacional.MAYOR_IGUAL, @1.first_line, @1.first_column) }
    | expresion
; 

ternario 
    : tipo IDENTIFICADOR ASIGNACION condiciones INTERROGACION expresion DOS_PUNTOS expresion
    | IDENTIFICADOR ASIGNACION condiciones INTERROGACION expresion DOS_PUNTOS expresion
;

condiciones
    : NOT condiciones
    | condicion OR condiciones
    | condicion AND condiciones
    //| PARENTESIS_ABRE condiciones PARENTESIS_CIERRA
    | condicion
;

casteo 
    : PARENTESIS_ABRE tipo PARENTESIS_CIERRA
;

bloque 
    : LLAVE_ABRE instrucciones LLAVE_CIERRA
    | LLAVE_ABRE LLAVE_CIERRA
;

if
    : IF PARENTESIS_ABRE condiciones PARENTESIS_CIERRA bloque else
;

else 
    : ELSE IF PARENTESIS_ABRE condiciones PARENTESIS_CIERRA bloque else
    | ELSE bloque
    | 
;

switch
    : SWITCH PARENTESIS_ABRE expresion PARENTESIS_CIERRA LLAVE_ABRE case
;

case
    : CASE expresion DOS_PUNTOS instrucciones case
    | DEFAULT DOS_PUNTOS instrucciones LLAVE_CIERRA
    | LLAVE_CIERRA
;

do
    : DO bloque WHILE PARENTESIS_ABRE condiciones PARENTESIS_CIERRA PUNTO_COMA
;

while
    : WHILE PARENTESIS_ABRE condiciones PARENTESIS_CIERRA bloque
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

