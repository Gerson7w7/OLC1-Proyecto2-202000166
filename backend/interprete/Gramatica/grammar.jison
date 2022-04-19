%{
    const { Aritmetica, TipoAritmetica } = require("../Expresion/Aritmetica");
    const { Relacional, TipoRelacional } = require("../Expresion/Relacional");
    const { Literal, TipoLiteral } = require("../Expresion/Literal");
    const { Print, Println } = require("../Intrucciones/Imprimir");
    const { Acceso } = require("../Expresion/Acceso");
    const { Declaracion, AsignacionSimple } = require("../Intrucciones/Declaracion");
    const { Ternario } = require("../Expresion/Ternario");
    const { Logico, TipoLogico } = require("../Expresion/Logico");
    const { Casteo } = require("../Expresion/Casteo");
    const { IncrementoDecremento } = require("../Expresion/IncrementoDecremento");
    const { DeclaracionVector1, DeclaracionVector2, AsignacionVectorSimple } = require("../Intrucciones/DeclaracionVector");
    const { AccesoVector } = require("../Expresion/AccesoVector");
    const { Bloque } = require("../Intrucciones/Bloque");
    const { IfElse } = require("../Intrucciones/IfElse");
    const { While } = require("../Intrucciones/While");
    const { Break, Continue, Return } = require("../Intrucciones/Transferencias");
    const { Switch, Case, Default } = require("../Intrucciones/Switch");
    const { For } = require("../Intrucciones/For");
    const { DoWhile } = require("../Intrucciones/DoWhile");
    const { ToUpperCase, ToLowerCase } = require("../Expresion/ToUpLowCase");
    const { Round } = require("../Expresion/Round");
    const { Length } = require("../Expresion/Length");
    const { TypeOf } = require("../Expresion/TypeOf");
    const { ToString } = require("../Expresion/ToString");
    const { ToChararray } = require("../Expresion/ToChararray");
    const { Funcion } = require("../Intrucciones/Funcion");
    const { LlamadaFuncion } = require("../Intrucciones/LlamadaFuncion");
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
"<="                        return 'MENOR_IGUAL';
"<"                         return 'MENOR';
">="                        return 'MAYOR_IGUAL';
">"                         return 'MAYOR';

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
"length"                    return 'LENGTH';
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
[0-9]+("."[0-9]+)\b  	    return 'DECIMAL';
[0-9]+\b				    return 'ENTERO';
([a-zA-Z_])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';
\"[^\"]*\"			        { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'\\?.\'                	{ yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }

<<EOF>>				        return 'EOF';
.					        {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext)}

/lex

%left 'COMA' 'CORCHETE_CIERRA'
%left 'INTERROGACION' 'PARENTESIS_CIERRA'
%left 'OR'
%left 'AND'
%left 'MODULO'
%left 'IGUAL' 'DESIGUAL' 'MENOR' 'MENOR_IGUAL' 'MAYOR' 'MAYOR_IGUAL' 
%left 'SUMA' 'RESTA'
%left 'MULTIPLICACION' 'DIVISION'
%left 'POTENCIA'
%left UMENOS
%right 'IDENTIFICADOR'
%right casteo 
%right 'NOT'

%start ini

%%

ini
    : instrucciones EOF {
        return $1;
    }
    | EOF
;

instrucciones
    : instrucciones instruccion { $1.push($2); $$ = $1; }
    | instruccion               { $$ = [$1]; }  
;

instruccion
    : declaracion PUNTO_COMA
    | asignacion_simple PUNTO_COMA
    | imprimir PUNTO_COMA
    | incremento_decremento PUNTO_COMA
    | declaracion_vector PUNTO_COMA
    | asignacion_simple_vector PUNTO_COMA
    | if
    | while
    | switch
    | for
    | do-while
    | funcion
    | metodo
    | llamada_funcion PUNTO_COMA
    // sentencias de transferencia
    | BREAK PUNTO_COMA                      { $$ = new Break(@1.first_line, @1.first_column) }
    | CONTINUE PUNTO_COMA                   { $$ = new Continue(@1.first_line, @1.first_column) }
    | RETURN PUNTO_COMA                     { $$ = new Return(null, @1.first_line, @1.first_column) }
    | RETURN expresion PUNTO_COMA           { $$ = new Return($2, @1.first_line, @1.first_column) }
;

tipo 
    : INT     
    | DOUBLE
    | BOOLEAN
    | CHAR
    | STRING
;

declaracion 
    : tipo identificadores ASIGNACION expresion { $$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column) }
    | tipo identificadores                      { $$ = new Declaracion($1, $2, null, @1.first_line, @1.first_column) }
;

asignacion_simple
    : IDENTIFICADOR ASIGNACION expresion    { $$ = new AsignacionSimple($1, $3, @1.first_line, @1.first_column) }
;

identificadores
    : identificadores COMA IDENTIFICADOR    { $1.push($3); $$ = $1 }
    | IDENTIFICADOR                         { $$ = [$1] }
;

expresion
    // UNIDAD ARITMÉTICA
    : RESTA expresion %prec UMENOS                          { $$ = new Aritmetica($2, new Literal("-1", TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column) } 
    | expresion SUMA expresion                              { $$ = new Aritmetica($1, $3, TipoAritmetica.SUMA, @1.first_line, @1.first_column) }
    | expresion RESTA expresion                             { $$ = new Aritmetica($1, $3, TipoAritmetica.RESTA, @1.first_line, @1.first_column) }
    | expresion MULTIPLICACION expresion                    { $$ = new Aritmetica($1, $3, TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column) }
    | expresion DIVISION expresion                          { $$ = new Aritmetica($1, $3, TipoAritmetica.DIVISION, @1.first_line, @1.first_column) }
    | expresion POTENCIA expresion                          { $$ = new Aritmetica($1, $3, TipoAritmetica.POTENCIA, @1.first_line, @1.first_column) }
    | expresion MODULO expresion                            { $$ = new Aritmetica($1, $3, TipoAritmetica.MODULO, @1.first_line, @1.first_column) }
    | PARENTESIS_ABRE expresion PARENTESIS_CIERRA           { $$ = $2 }
    // UNIDAD RELACIONAL
    | expresion IGUAL expresion                             { $$ = new Relacional($1, $3, TipoRelacional.IGUAL, @1.first_line, @1.first_column) }
    | expresion DESIGUAL expresion                          { $$ = new Relacional($1, $3, TipoRelacional.DESIGUAL, @1.first_line, @1.first_column) }
    | expresion MENOR expresion                             { $$ = new Relacional($1, $3, TipoRelacional.MENOR, @1.first_line, @1.first_column) }
    | expresion MENOR_IGUAL expresion                       { $$ = new Relacional($1, $3, TipoRelacional.MENOR_IGUAL, @1.first_line, @1.first_column) }
    | expresion MAYOR expresion                             { $$ = new Relacional($1, $3, TipoRelacional.MAYOR, @1.first_line, @1.first_column) }
    | expresion MAYOR_IGUAL expresion                       { $$ = new Relacional($1, $3, TipoRelacional.MAYOR_IGUAL, @1.first_line, @1.first_column) }
    // UNIDAD LÓGICA
    | NOT expresion                                         { $$ = new Logico($2, null, TipoLogico.NOT, @1.first_line, @1.first_column) }
    | expresion OR expresion                                { $$ = new Logico($1, $3, TipoLogico.OR, @1.first_line, @1.first_column) }
    | expresion AND expresion                               { $$ = new Logico($1, $3, TipoLogico.AND, @1.first_line, @1.first_column) }
    // TERMINALES
    | ENTERO                                                { $$ = new Literal($1, TipoLiteral.ENTERO, @1.first_line, @1.first_column) }
    | DECIMAL                                               { $$ = new Literal($1, TipoLiteral.DECIMAL, @1.first_line, @1.first_column) }
    | CARACTER                                              { $$ = new Literal($1, TipoLiteral.CARACTER, @1.first_line, @1.first_column) }
    | CADENA                                                { $$ = new Literal($1, TipoLiteral.CADENA, @1.first_line, @1.first_column) }
    | IDENTIFICADOR                                         { $$ = new Acceso($1, @1.first_line, @1.first_column) }
    | FALSE                                                 { $$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line, @1.first_column) }
    | TRUE                                                  { $$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line, @1.first_column) }
    | ternario                                              { $$ = $1 }
    | IDENTIFICADOR corchetes_con_expresion                 { $$ = new AccesoVector($1, $2, @1.first_line, @1.first_column) }
    // casteos  
    | casteo expresion                                      { $$ = new Casteo($1, $2, @1.first_line, @1.first_column) }
    // incrementos y decremetos
    | incremento_decremento                                 { $$ = $1 }
    // funciones nativas
    | funciones_nativas                                     { $$ = $1 }
    | llamada_funcion                                       { $$ = $1 }
;

imprimir
    : PRINT PARENTESIS_ABRE expresion PARENTESIS_CIERRA     { $$ = new Print($3, @1.first_line, @1.first_column) }
    | PRINTLN PARENTESIS_ABRE expresion PARENTESIS_CIERRA   { $$ = new Println($3, @1.first_line, @1.first_column) }
;

ternario 
    : expresion INTERROGACION expresion DOS_PUNTOS expresion    { $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column) }
;

casteo 
    : PARENTESIS_ABRE tipo PARENTESIS_CIERRA    { $$ = $2 }
;

incremento_decremento
    : expresion SUMA SUMA       { $$ = new IncrementoDecremento($1, TipoAritmetica.SUMA, @1.first_line, @1.first_column) }
    | expresion RESTA RESTA     { $$ = new IncrementoDecremento($1, TipoAritmetica.RESTA, @1.first_line, @1.first_column) }
;

declaracion_vector 
    : tipo IDENTIFICADOR corchetes_vacios ASIGNACION NEW tipo corchetes_con_expresion                       { $$ = new DeclaracionVector1($1, $2, $6, $7, @1.first_line, @1.first_column) } // ejemplo: int a[][] = new int[4][4]
    | tipo IDENTIFICADOR corchetes_vacios ASIGNACION CORCHETE_ABRE lista_valores_vectores CORCHETE_CIERRA   { $$ = new DeclaracionVector2($1, $2, $6, @1.first_line, @1.first_column) } // ejemplo: int a[][] = [[1,2],[1,2]] 
    | tipo IDENTIFICADOR corchetes_vacios ASIGNACION expresion                                              { $$ = new DeclaracionVector2($1, $2, $5, @1.first_line, @1.first_column) }                                              
;

corchetes_vacios
    : CORCHETE_ABRE CORCHETE_CIERRA corchetes_vacios
    | CORCHETE_ABRE CORCHETE_CIERRA
;

corchetes_con_expresion
    : corchetes_con_expresion CORCHETE_ABRE expresion CORCHETE_CIERRA   { $1.push($3); $$ = $1; }
    | CORCHETE_ABRE expresion CORCHETE_CIERRA                           { $$ = [$2]; }
;

lista_valores_vectores
    : CORCHETE_ABRE lista_expresiones CORCHETE_CIERRA COMA  lista_valores_vectores  { $5.push($2); $$ = $5; }
    | CORCHETE_ABRE lista_expresiones CORCHETE_CIERRA                               { $$ = [$2]; }
    | lista_expresiones                                                             { $$ = $1; }    
;

lista_expresiones 
    : lista_expresiones COMA expresion  { $1.push($3); $$ = $1; }
    | expresion                         { $$ = [$1]; }
;

asignacion_simple_vector
    : IDENTIFICADOR corchetes_con_expresion ASIGNACION expresion    { $$ = new AsignacionVectorSimple($1, $2, $4, @1.first_line, @1.first_column) }
;

bloque 
    : LLAVE_ABRE instrucciones LLAVE_CIERRA { $$ = new Bloque($2, @1.first_line, @1.first_column) }
    | LLAVE_ABRE LLAVE_CIERRA               { $$ = new Bloque([], @1.first_line, @1.first_column) }
;

condicion
    : PARENTESIS_ABRE expresion PARENTESIS_CIERRA   { $$ = $2 }
;

if
    : IF condicion bloque else    { $$ = new IfElse($2, $3, $4, @1.first_line, @1.first_column) }
;

else 
    : ELSE bloque   { $$ = $2 }
    | ELSE if       { $$ = $2 }
    | { $$ = null }
;

while
    : WHILE condicion bloque    { $$ = new While($2, $3, @1.first_line, @1.first_column) }
;

switch
    : SWITCH condicion LLAVE_ABRE case_list default LLAVE_CIERRA    { $$ = new Switch($2, $4, $5, @1.first_line, @1.first_column) } 
    | SWITCH condicion LLAVE_ABRE case_list LLAVE_CIERRA            { $$ = new Switch($2, $4, null, @1.first_line, @1.first_column) } 
    | SWITCH condicion LLAVE_ABRE default LLAVE_CIERRA              { $$ = new Switch($2, null, $4, @1.first_line, @1.first_column) } 
;

case_list
    : case_list case    { $1.push($2); $$ = $1; }
    | case              { $$ = [$1]; }
;

case 
    : CASE expresion DOS_PUNTOS instrucciones       { $$ = new Case($2, $4, @1.first_line, @1.first_column) } // retorna condición y lista de instrucciones
;

default
    : DEFAULT DOS_PUNTOS instrucciones              { $$ = new Default($3, @1.first_line, @1.first_column) } // retorna lista de instrucciones
;

for 
    : FOR PARENTESIS_ABRE for1 PUNTO_COMA expresion PUNTO_COMA for2 PARENTESIS_CIERRA bloque    { $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column) }
;

for1   
    : declaracion       { $$ = $1 } 
    | asignacion_simple { $$ = $1 }
;

for2
    : asignacion_simple     { $$ = $1 }
    | expresion             { $$ = $1 }
;

do-while
    : DO bloque WHILE condicion PUNTO_COMA  { $$ = new DoWhile($2, $4, @1.first_line, @1.first_column) }
;

funciones_nativas
    : TOUPPER PARENTESIS_ABRE expresion PARENTESIS_CIERRA       { $$ = new ToUpperCase($3, @1.first_line, @1.first_column) }    
    | TOLOWER PARENTESIS_ABRE expresion PARENTESIS_CIERRA       { $$ = new ToLowerCase($3, @1.first_line, @1.first_column) }
    | ROUND PARENTESIS_ABRE expresion PARENTESIS_CIERRA         { $$ = new Round($3, @1.first_line, @1.first_column) }
    | LENGTH PARENTESIS_ABRE expresion PARENTESIS_CIERRA        { $$ = new Length($3, @1.first_line, @1.first_column) }
    | TYPEOF PARENTESIS_ABRE expresion PARENTESIS_CIERRA        { $$ = new TypeOf($3, @1.first_line, @1.first_column) }
    | TOSTRING PARENTESIS_ABRE expresion PARENTESIS_CIERRA      { $$ = new ToString($3, @1.first_line, @1.first_column) }
    | TOCHARARRAY PARENTESIS_ABRE expresion PARENTESIS_CIERRA   { $$ = new ToChararray($3, @1.first_line, @1.first_column) }
;

funcion
    : IDENTIFICADOR PARENTESIS_ABRE PARENTESIS_CIERRA DOS_PUNTOS tipo bloque            { $$ = new Funcion($1, [], $5, $6, @1.first_line, @1.first_column) }   
    | IDENTIFICADOR PARENTESIS_ABRE parametros PARENTESIS_CIERRA DOS_PUNTOS tipo bloque { $$ = new Funcion($1, $3, $6, $7, @1.first_line, @1.first_column) }
;

metodo
    : IDENTIFICADOR PARENTESIS_ABRE PARENTESIS_CIERRA DOS_PUNTOS VOID bloque            { $$ = new Funcion($1, [], null, $6, @1.first_line, @1.first_column) }
    | IDENTIFICADOR PARENTESIS_ABRE parametros PARENTESIS_CIERRA DOS_PUNTOS VOID bloque { $$ = new Funcion($1, $3, null, $7, @1.first_line, @1.first_column) }
    | IDENTIFICADOR PARENTESIS_ABRE PARENTESIS_CIERRA bloque                            { $$ = new Funcion($1, [], null, $4, @1.first_line, @1.first_column) }
    | IDENTIFICADOR PARENTESIS_ABRE parametros PARENTESIS_CIERRA bloque                 { $$ = new Funcion($1, $3, null, $5, @1.first_line, @1.first_column) }
;

parametros
    : parametros COMA parametros2   { $1.push($3); $$ = $1; }
    | parametros2                   { $$ = [$1]; }
;

parametros2
    : tipo IDENTIFICADOR    { $$ = new Declaracion($1, [$2], null, @1.first_line, @1.first_column) }
;

llamada_funcion
    : IDENTIFICADOR PARENTESIS_ABRE lista_expresiones PARENTESIS_CIERRA { $$ = new LlamadaFuncion($1, $3, @1.first_line, @1.first_column) }
    | IDENTIFICADOR PARENTESIS_ABRE PARENTESIS_CIERRA                   { $$ = new LlamadaFuncion($1, [], @1.first_line, @1.first_column) }
;
