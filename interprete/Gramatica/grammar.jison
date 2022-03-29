%{
    const { Aritmetica, TipoAritmetica } = require("../Expresion/Aritmetica");
    const { Relacional, TipoRelacional } = require("../Expresion/Relacional");
    const { Literal, TipoLiteral } = require("../Expresion/Literal");
%}

%lex

%options case-insensitive

%%

// comentarios y espacios a ignorar
\s+                         // ignorar espacios en blanco
"/*"[^"*/"]*"*/"            // comentarios multilínea
"//".*                      // comentario de una línea

// tipos de datos
"int"                       return 'INT';
"double"                    return 'DOUBLE';
"boolean"                   return 'BOOLEAN';
"char"                      return 'CHAR';
"string"                    return 'STRING';

// operadores aritméticos
"+"                         return 'SUMA';
"-"                         return 'RESTA';
"*"                         return 'MULTIPLICACION';
"/"                         return 'DIVISION';
"^"                         return 'POTENCIA';
"%"                         return 'MODULO';

// operadores relacionales
"=="                        return 'IGUAL';
"!="                        return 'DESIGUAL';
"<"                         return 'MENOR';
"<="                        return 'MENOR_IGUAL';
">"                         return 'MAYOR';
">="                        return 'MAYOR_IGUAL';

// operadores lógicos
"||"                        return 'OR';
"&&"                        return 'AND';
"!"                         return 'NOT';

// finalización y encapsulamiento
";"                         return 'PUNTO_COMA';
"{"                         return 'LLAVE_ABRE';
"}"                         return 'LLAVE_CIERRA';

// sentencias de control
"if"                        return 'IF';
"else"                      return 'ELSE';
"switch"                    return 'SWITCH';
"case"                      return 'CASE';
"default"                   return 'DEFAULT';

// sentencias cíclicas
"while"                     return 'WHILE';
"for"                       return 'FOR';
"do"                        return 'DO';

// sentencias de transferencia
"break"                     return 'BREAK';
"continue"                  return 'CONTINUE';
"return"                    return 'RETURN';

// funciones nativas
"print"                     return 'PRINT';
"println"                   return 'PRINTLN';
"tolower"                   return 'TOLOWER';
"toupper"                   return 'TOUPPER';
"round"                     return 'ROUND';
"length"                    return 'LENGHT';
"typeof"                    return 'TYPEOF';
"tostring"                  return 'TOSTRING';
"tochararray"               return 'TOCHARARRAY';

// palabras reservadas
"?"                         return 'INTERROGACION';
":"                         return 'DOS_PUNTOS';
"="                         return 'ASIGNACION';
"("                         return 'PARENTESIS_ABRE';
")"                         return 'PARENTESIS_CIERRA';
","                         return 'COMA';
"["                         return 'CORCHETE_ABRE';
"]"                         return 'CORCHETE_CIERRA';
"new"                       return 'NEW';
"void"                      return 'VOID';
"run"                       return 'RUN';
"true"                      return 'TRUE';
"false"                     return 'FALSE';

// expresiones regulares
"\""[^\"]*"\""				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
("\'")("\\".)|(.)("\'")		{ yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
[0-9]+("."[0-9]+)?\b  	    return 'DECIMAL';
[0-9]+\b				    return 'ENTERO';
([a-zA-Z_])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';
<<EOF>>				        return 'EOF';
.					        {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext)}

/lex

%right UNMENOS
%left 'POTENCIA'
%left 'DIVISION' 'MULTIPLICACION'
%left 'SUMA' 'RESTA'
%left 'IGUAL' 'DESIGUAL' 'MENOR' 'MENOR_IGUAL' 'MAYOR' 'MAYOR_IGUAL'
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'
%right 'NOT'
%left 'AND'
%left 'OR'

%start ini

%%

ini
    : instrucciones EOF {
        return $1;
    }
;

instrucciones
    : instruccion instrucciones
    | instruccion
;

instruccion
    : declaracion PUNTO_COMA
    | asignacion_simple PUNTO_COMA
    | ternario PUNTO_COMA
    | incremento_decremento PUNTO_COMA
    | llamada_funcion PUNTO_COMA
    | imprimir PUNTO_COMA
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

tipo 
    : INT
    | DOUBLE
    | BOOLEAN
    | CHAR
    | STRING
;

declaracion 
    : tipo IDENTIFICADOR asignacion
;

asignacion
    : ASIGNACION expresion
    | COMA IDENTIFICADOR asignacion
    | corchetes_vacios ASIGNACION asignacion_vector
    |
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
    | corchetes_vector

asignacion_simple
    : IDENTIFICADOR ASIGNACION expresion
    | IDENTIFICADOR new_corchetes ASIGNACION expresion
;

expresion
    : MENOS expresion %prec UNMENOS 
    | expresion SUMA expresion 
    | expresion RESTA expresion
    | expresion MULTIPLICACION expresion
    | expresion DIVISION expresion
    | expresion POTENCIA expresion
    | expresion MODULO expresion
    | PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | casteo expresion
    | incremento_decremento
    | llamada_funcion
    | ENTERO
    | DECIMAL
    | TRUE
    | FALSE
    | CARACTER
    | CADENA
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
    : expresion IGUAL expresion
    | expresion DESIGUAL expresion
    | expresion MENOR expresion
    | expresion MENOR_IGUAL expresion
    | expresion MAYOR expresion
    | expresion MAYOR_IGUAL expresion
    | PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | expresion
; 

ternario 
    : asignacion_simple ternario2
    | declaracion ternario2
;

ternario2
    : ASIGNACION condiciones INTERROGACION expresion DOS_PUNTOS expresion
;

condiciones
    : NOT condiciones
    | condicion OR condiciones
    | condicion AND condiciones
    | PARENTESIS_ABRE condiciones PARENTESIS_CIERRA
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
    : FOR PARENTESIS_ABRE for1 bloque
;

for1
    : declaracion PUNTO_COMA condiciones PUNTO_COMA for2
    | asignacion_simple PUNTO_COMA condiciones PUNTO_COMA for2
;

for2   
    : incremento_decremento
    | asignacion_simple
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

imprimir
    : PRINT PARENTESIS_ABRE expresion PARENTESIS_CIERRA
    | PRINTLN PARENTESIS_ABRE expresion PARENTESIS_CIERRA
;