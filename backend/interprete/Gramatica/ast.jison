%{
    const { Nodo } = require("../Extra/ArbolAST");
    const { _Error } = require("../Error/_Error");
%}

%lex

%options case-insensitive

%%

// comentarios y espacios a ignorar
\s+                                 // ignorar espacios en blanco
"//".*                              // comentario de una línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentarios multilínea

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
.					        return 'ERROR';

/lex

%left 'COMA' 'CORCHETE_CIERRA'
%left 'INTERROGACION' 'DOS_PUNTOS' 'PARENTESIS_CIERRA'
%left 'OR'
%left 'AND'
%left 'DESIGUAL' 'IGUAL'
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'
%left 'SUMA' 'RESTA'
%left 'MULTIPLICACION' 'DIVISION' 'MODULO'
%left 'POTENCIA'
%left UMENOS
%right 'IDENTIFICADOR'
%right casteo 
%right 'NOT'

%start ini

%%

ini
    : instrucciones EOF {   $$ = new Nodo('inicio'); 
                            $$.agregarHijo($1);
                            return $$;
                        }
    | EOF
;

instrucciones
    : instrucciones instruccion {   $$ = new Nodo('instrucciones');
                                    $$.hijos = [...$1.hijos, ...$2.hijos];
                                }
    | instruccion               {   $$ = new Nodo('instrucciones');
                                    $$.hijos = [...$1.hijos];
                                }  
    | error                     { throw new _Error(@1.first_line, @1.first_column, "Sintáctico", "No se esperaba el siguiente token: " + yytext, yytext) }
;

instruccion
    : declaracion PUNTO_COMA                { $$ = new Nodo('instruccion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo(';')); }
    | asignacion_simple PUNTO_COMA          { $$ = new Nodo('instruccion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo(';')); }
    | imprimir PUNTO_COMA                   { $$ = new Nodo('instruccion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo(';')); }
    | incremento_decremento PUNTO_COMA      { $$ = new Nodo('instruccion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo(';')); }
    | declaracion_vector PUNTO_COMA         { $$ = new Nodo('instruccion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo(';')); }
    | asignacion_simple_vector PUNTO_COMA   { $$ = new Nodo('instruccion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo(';')); }
    | if                                    { $$ = new Nodo('instruccion'); $$.agregarHijo($1); }
    | while                                 { $$ = new Nodo('instruccion'); $$.agregarHijo($1); }
    | switch                                { $$ = new Nodo('instruccion'); $$.agregarHijo($1); }
    | for                                   { $$ = new Nodo('instruccion'); $$.agregarHijo($1); }
    | do-while                              { $$ = new Nodo('instruccion'); $$.agregarHijo($1); }
    | funcion                               { $$ = new Nodo('instruccion'); $$.agregarHijo($1); }
    | metodo                                { $$ = new Nodo('instruccion'); $$.agregarHijo($1); }
    | llamada_funcion PUNTO_COMA            { $$ = new Nodo('instruccion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo(';')); }
    | RUN llamada_funcion PUNTO_COMA        { $$ = new Nodo('instruccion'); $$.agregarHijo(new Nodo('run')); $$.agregarHijo($2); $$.agregarHijo(new Nodo(';')); }
    // sentencias de transferencia
    | BREAK PUNTO_COMA                      { $$ = new Nodo('instruccion'); $$.agregarHijo(new Nodo('break')); $$.agregarHijo(new Nodo(';')); }    
    | CONTINUE PUNTO_COMA                   { $$ = new Nodo('instruccion'); $$.agregarHijo(new Nodo('continue')); $$.agregarHijo(new Nodo(';')); }          
    | RETURN PUNTO_COMA                     { $$ = new Nodo('instruccion'); $$.agregarHijo(new Nodo('return')); $$.agregarHijo(new Nodo(';')); }   
    | RETURN expresion PUNTO_COMA           { $$ = new Nodo('instruccion'); $$.agregarHijo(new Nodo('return')); $$.agregarHijo($2); $$.agregarHijo(new Nodo(';')); }   
;

tipo 
    : INT       { $$ = new Nodo('tipo'); $$.agregarHijo(new Nodo('int')); }         
    | DOUBLE    { $$ = new Nodo('tipo'); $$.agregarHijo(new Nodo('double')); } 
    | BOOLEAN   { $$ = new Nodo('tipo'); $$.agregarHijo(new Nodo('boolean')); } 
    | CHAR      { $$ = new Nodo('tipo'); $$.agregarHijo(new Nodo('char')); } 
    | STRING    { $$ = new Nodo('tipo'); $$.agregarHijo(new Nodo('string')); } 
;

declaracion 
    : tipo identificadores ASIGNACION expresion { $$ = new Nodo('declaracion'); $$.agregarHijo($1); $$.agregarHijo($2); $$.agregarHijo(new Nodo('=')); $$.agregarHijo($4); } 
    | tipo identificadores                      { $$ = new Nodo('declaracion'); $$.agregarHijo($1); $$.agregarHijo($2); } 
;

asignacion_simple
    : IDENTIFICADOR ASIGNACION expresion    { $$ = new Nodo('asignacion_simple'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo(new Nodo('=')); $$.agregarHijo($3); }     
;

identificadores
    : identificadores COMA IDENTIFICADOR    { $$ = new Nodo('identificadores'); $$.agregarHijo($1); $$.agregarHijo(new Nodo(',')); $$.agregarHijo(new Nodo($3)); }
    | IDENTIFICADOR                         { $$ = new Nodo('identificadores'); $$.agregarHijo(new Nodo($1)); }
;

expresion
    // UNIDAD ARITMÉTICA
    : RESTA expresion %prec UMENOS                          { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo('-')); $$.agregarHijo($2); }
    | expresion SUMA expresion                              { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('+')); $$.agregarHijo($3); }
    | expresion RESTA expresion                             { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('-')); $$.agregarHijo($3); }
    | expresion MULTIPLICACION expresion                    { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('*')); $$.agregarHijo($3); }
    | expresion DIVISION expresion                          { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('/')); $$.agregarHijo($3); }
    | expresion POTENCIA expresion                          { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('^')); $$.agregarHijo($3); }
    | expresion MODULO expresion                            { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('%')); $$.agregarHijo($3); }
    | PARENTESIS_ABRE expresion PARENTESIS_CIERRA           { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo($2); $$.agregarHijo(new Nodo($3)); }
    // UNIDAD RELACIONAL
    | expresion IGUAL expresion                             { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('==')); $$.agregarHijo($3); }
    | expresion DESIGUAL expresion                          { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('!=')); $$.agregarHijo($3); }
    | expresion MENOR expresion                             { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('<')); $$.agregarHijo($3); }
    | expresion MENOR_IGUAL expresion                       { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('<=')); $$.agregarHijo($3); }
    | expresion MAYOR expresion                             { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('>')); $$.agregarHijo($3); }
    | expresion MAYOR_IGUAL expresion                       { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('>=')); $$.agregarHijo($3); }
    // UNIDAD LÓGICA
    | NOT expresion                                         { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo('!')); $$.agregarHijo($2); }
    | expresion OR expresion                                { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('||')); $$.agregarHijo($3); }
    | expresion AND expresion                               { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('&&')); $$.agregarHijo($3); }
    // TERMINALES
    | ENTERO                                                { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo($1)); }
    | DECIMAL                                               { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo($1)); }
    | CARACTER                                              { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo($1)); }
    | CADENA                                                { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo($1)); }
    | IDENTIFICADOR                                         { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo($1)); }
    | FALSE                                                 { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo($1)); }
    | TRUE                                                  { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo($1)); }
    | ternario                                              { $$ = new Nodo('expresion'); $$.agregarHijo($1); } 
    | IDENTIFICADOR corchetes_con_expresion                 { $$ = new Nodo('expresion'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo($2); } 
    // casteos  
    | casteo expresion                                      { $$ = new Nodo('expresion'); $$.agregarHijo($1); $$.agregarHijo($2); }         
    // incrementos y decremetos
    | incremento_decremento                                 { $$ = new Nodo('expresion'); $$.agregarHijo($1); }                
    // funciones nativas
    | funciones_nativas                                     { $$ = new Nodo('expresion'); $$.agregarHijo($1); }              
    | llamada_funcion                                       { $$ = new Nodo('expresion'); $$.agregarHijo($1); }        
;

imprimir
    : PRINT PARENTESIS_ABRE expresion PARENTESIS_CIERRA     { $$ = new Nodo('imprimir'); $$.agregarHijo(new Nodo('print')); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); }         
    | PRINTLN PARENTESIS_ABRE expresion PARENTESIS_CIERRA   { $$ = new Nodo('imprimir'); $$.agregarHijo(new Nodo('println')); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); }
;

ternario 
    : expresion INTERROGACION expresion DOS_PUNTOS expresion    { $$ = new Nodo('ternario'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('?')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(':')); $$.agregarHijo($5); }
;

casteo 
    : PARENTESIS_ABRE tipo PARENTESIS_CIERRA    { $$ = new Nodo('casteo'); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($2); $$.agregarHijo(new Nodo(')')); }
;

incremento_decremento   
    : expresion SUMA SUMA   { $$ = new Nodo('incremento_decremento'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('++')); }
    | expresion RESTA RESTA { $$ = new Nodo('incremento_decremento'); $$.agregarHijo($1); $$.agregarHijo(new Nodo('--')); }
;

declaracion_vector 
    : tipo IDENTIFICADOR corchetes_vacios ASIGNACION NEW tipo corchetes_con_expresion                       { $$ = new Nodo('declaracion_vector'); $$.agregarHijo($1); $$.agregarHijo(new Nodo($2)); $$.agregarHijo($3); $$.agregarHijo(new Nodo('=')); $$.agregarHijo(new Nodo('new')); $$.agregarHijo($6); $$.agregarHijo($7); }
    | tipo IDENTIFICADOR corchetes_vacios ASIGNACION CORCHETE_ABRE lista_valores_vectores CORCHETE_CIERRA   { $$ = new Nodo('declaracion_vector'); $$.agregarHijo($1); $$.agregarHijo(new Nodo($2)); $$.agregarHijo($3); $$.agregarHijo(new Nodo('=')); $$.agregarHijo(new Nodo('[')); $$.agregarHijo($6); $$.agregarHijo(new Nodo(']')); }   
    | tipo IDENTIFICADOR corchetes_vacios ASIGNACION expresion                                              { $$ = new Nodo('declaracion_vector'); $$.agregarHijo($1); $$.agregarHijo(new Nodo($2)); $$.agregarHijo($3); $$.agregarHijo(new Nodo('=')); $$.agregarHijo($5); }
;

corchetes_vacios
    : CORCHETE_ABRE CORCHETE_CIERRA corchetes_vacios    { $$ = new Nodo('corchetes_vacios'); $$.hijos = [new Nodo('['), new Nodo(']'), ...$3.hijos]; }
    | CORCHETE_ABRE CORCHETE_CIERRA                     { $$ = new Nodo('corchetes_vacios'); $$.hijos = [new Nodo('['), new Nodo(']')]; }
;

corchetes_con_expresion
    : corchetes_con_expresion CORCHETE_ABRE expresion CORCHETE_CIERRA   { $$ = new Nodo('corchetes_con_expresion'); $$.hijos = [...$1.hijos, new Nodo('['), ...$3.hijos, new Nodo(']')]; }
    | CORCHETE_ABRE expresion CORCHETE_CIERRA                           { $$ = new Nodo('corchetes_con_expresion'); $$.hijos = [new Nodo('['), ...$2.hijos, new Nodo(']')]; }
;

lista_valores_vectores
    : CORCHETE_ABRE lista_expresiones CORCHETE_CIERRA COMA  lista_valores_vectores  { $$ = new Nodo('lista_valores_vectores'); $$.hijos = [new Nodo('['), ...$2.hijos, new Nodo(']'), new Nodo(','), ...$5.hijos]; }
    | CORCHETE_ABRE lista_expresiones CORCHETE_CIERRA                               { $$ = new Nodo('lista_valores_vectores'); $$.hijos = [new Nodo('['), ...$2.hijos, new Nodo(']')]; }
    | lista_expresiones                                                             { $$ = new Nodo('lista_valores_vectores'); $$.agregarHijo($1); }  
;

lista_expresiones 
    : lista_expresiones COMA expresion  { $$ = new Nodo('lista_expresiones'); $$.hijos = [...$1.hijos, new Nodo(','), ...$3.hijos]; }
    | expresion                         { $$ = new Nodo('lista_expresiones'); $$.hijos = [...$1.hijos]; }
;

asignacion_simple_vector
    : IDENTIFICADOR corchetes_con_expresion ASIGNACION expresion    { $$ = new Nodo('asignacion_simple_vector'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo($2); $$.agregarHijo(new Nodo('=')); $$.agregarHijo($4); }  
;

bloque 
    : LLAVE_ABRE instrucciones LLAVE_CIERRA { $$ = new Nodo('bloque'); $$.agregarHijo(new Nodo('{')); $$.agregarHijo($2); $$.agregarHijo(new Nodo('}')); }
    | LLAVE_ABRE LLAVE_CIERRA               { $$ = new Nodo('bloque'); $$.agregarHijo(new Nodo('{')); $$.agregarHijo(new Nodo('}')); }
;            

condicion
    : PARENTESIS_ABRE expresion PARENTESIS_CIERRA   { $$ = new Nodo('condicion'); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($2); $$.agregarHijo(new Nodo(')')); }
;

if
    : IF condicion bloque else  { $$ = new Nodo('if'); $$.agregarHijo(new Nodo('if')); $$.agregarHijo($2); $$.agregarHijo($3); $$.agregarHijo($4); }
;

else 
    : ELSE bloque   { $$ = new Nodo('else'); $$.agregarHijo(new Nodo('else')); $$.agregarHijo($2); }
    | ELSE if       { $$ = new Nodo('else'); $$.agregarHijo(new Nodo('else')); $$.agregarHijo($2); }
    | { $$ = null }
;

while
    : WHILE condicion bloque    { $$ = new Nodo('while'); $$.agregarHijo(new Nodo('while')); $$.agregarHijo($2); $$.agregarHijo($3); }
;

switch
    : SWITCH condicion LLAVE_ABRE case_list default LLAVE_CIERRA    { $$ = new Nodo('switch'); $$.agregarHijo(new Nodo('switch')); $$.agregarHijo($2); $$.agregarHijo(new Nodo('{')); $$.agregarHijo($4); $$.agregarHijo($5); $$.agregarHijo(new Nodo('}')); }
    | SWITCH condicion LLAVE_ABRE case_list LLAVE_CIERRA            { $$ = new Nodo('switch'); $$.agregarHijo(new Nodo('switch')); $$.agregarHijo($2); $$.agregarHijo(new Nodo('{')); $$.agregarHijo($4); $$.agregarHijo(new Nodo('}')); }           
    | SWITCH condicion LLAVE_ABRE default LLAVE_CIERRA              { $$ = new Nodo('switch'); $$.agregarHijo(new Nodo('switch')); $$.agregarHijo($2); $$.agregarHijo(new Nodo('{')); $$.agregarHijo($4); $$.agregarHijo(new Nodo('}')); }              
;

case_list
    : case_list case    { $$ = new Nodo('case_list'); $$.hijos = [...$1.hijos, ...$2.hijos]; }
    | case              { $$ = new Nodo('case_list'); $$.hijos = [...$1.hijos]; }
;

case 
    : CASE expresion DOS_PUNTOS instrucciones   { $$ = new Nodo('case'); $$.agregarHijo(new Nodo('case')); $$.agregarHijo($2); $$.agregarHijo(new Nodo(':')); $$.agregarHijo($4); }
;

default
    : DEFAULT DOS_PUNTOS instrucciones  { $$ = new Nodo('default'); $$.agregarHijo(new Nodo('default')); $$.agregarHijo(new Nodo(':')); $$.agregarHijo($3); }              
;

for 
    : FOR PARENTESIS_ABRE for1 PUNTO_COMA expresion PUNTO_COMA for2 PARENTESIS_CIERRA bloque {  $$ = new Nodo('for'); 
                                                                                                $$.agregarHijo(new Nodo('for')); 
                                                                                                $$.agregarHijo(new Nodo('(')); 
                                                                                                $$.agregarHijo($3); 
                                                                                                $$.agregarHijo(new Nodo(';')); 
                                                                                                $$.agregarHijo($5);
                                                                                                $$.agregarHijo(new Nodo(';')); 
                                                                                                $$.agregarHijo($7);
                                                                                                $$.agregarHijo(new Nodo(')')); 
                                                                                                $$.agregarHijo($9);
                                                                                             }
;

for1   
    : declaracion       { $$ = new Nodo('for1'); $$.agregarHijo($1); } 
    | asignacion_simple { $$ = new Nodo('for1'); $$.agregarHijo($1); } 
;

for2
    : asignacion_simple { $$ = new Nodo('for2'); $$.agregarHijo($1); } 
    | expresion         { $$ = new Nodo('for2'); $$.agregarHijo($1); } 
;

do-while
    : DO bloque WHILE condicion PUNTO_COMA  { $$ = new Nodo('do-while'); $$.agregarHijo(new Nodo('do')); $$.agregarHijo($2); $$.agregarHijo(new Nodo('while')); $$.agregarHijo($4); $$.agregarHijo(new Nodo(';')); } 
;

funciones_nativas
    : TOUPPER PARENTESIS_ABRE expresion PARENTESIS_CIERRA       { $$ = new Nodo('funciones_nativas'); $$.agregarHijo(new Nodo('toUpper')); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); } 
    | TOLOWER PARENTESIS_ABRE expresion PARENTESIS_CIERRA       { $$ = new Nodo('funciones_nativas'); $$.agregarHijo(new Nodo('toLower')); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); } 
    | ROUND PARENTESIS_ABRE expresion PARENTESIS_CIERRA         { $$ = new Nodo('funciones_nativas'); $$.agregarHijo(new Nodo('round')); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); } 
    | LENGTH PARENTESIS_ABRE expresion PARENTESIS_CIERRA        { $$ = new Nodo('funciones_nativas'); $$.agregarHijo(new Nodo('length')); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); } 
    | TYPEOF PARENTESIS_ABRE expresion PARENTESIS_CIERRA        { $$ = new Nodo('funciones_nativas'); $$.agregarHijo(new Nodo('typeOf')); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); } 
    | TOSTRING PARENTESIS_ABRE expresion PARENTESIS_CIERRA      { $$ = new Nodo('funciones_nativas'); $$.agregarHijo(new Nodo('toString')); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); } 
    | TOCHARARRAY PARENTESIS_ABRE expresion PARENTESIS_CIERRA   { $$ = new Nodo('funciones_nativas'); $$.agregarHijo(new Nodo('toCharArray')); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); } 
;

funcion
    : IDENTIFICADOR PARENTESIS_ABRE PARENTESIS_CIERRA DOS_PUNTOS tipo bloque            { $$ = new Nodo('funcion'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo(new Nodo('(')); $$.agregarHijo(new Nodo(')')); $$.agregarHijo(new Nodo(':')); $$.agregarHijo($5); $$.agregarHijo($6); }
    | IDENTIFICADOR PARENTESIS_ABRE parametros PARENTESIS_CIERRA DOS_PUNTOS tipo bloque { $$ = new Nodo('funcion'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); $$.agregarHijo(new Nodo(':')); $$.agregarHijo($6); $$.agregarHijo($7); }
;

metodo
    : IDENTIFICADOR PARENTESIS_ABRE PARENTESIS_CIERRA DOS_PUNTOS VOID bloque            { $$ = new Nodo('metodo'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo(new Nodo('(')); $$.agregarHijo(new Nodo(')')); $$.agregarHijo(new Nodo(':')); $$.agregarHijo(new Nodo('void')); $$.agregarHijo($6); }
    | IDENTIFICADOR PARENTESIS_ABRE parametros PARENTESIS_CIERRA DOS_PUNTOS VOID bloque { $$ = new Nodo('metodo'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); $$.agregarHijo(new Nodo(':')); $$.agregarHijo(new Nodo('void')); $$.agregarHijo($7); }
    | IDENTIFICADOR PARENTESIS_ABRE PARENTESIS_CIERRA bloque                            { $$ = new Nodo('metodo'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo(new Nodo('(')); $$.agregarHijo(new Nodo(')')); $$.agregarHijo($4); }
    | IDENTIFICADOR PARENTESIS_ABRE parametros PARENTESIS_CIERRA bloque                 { $$ = new Nodo('metodo'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); $$.agregarHijo($5); }
;

parametros
    : parametros COMA parametros2   { $$ = new Nodo('parametros'); $$.hijos = [...$1.hijos, new Nodo(','), ...$3.hijos]; }
    | parametros2                   { $$ = new Nodo('parametros'); $$.hijos = [...$1.hijos]; }
;

parametros2
    : tipo IDENTIFICADOR                    { $$ = new Nodo('parametros2'); $$.agregarHijo($1); $$.agregarHijo(new Nodo($2)); }
    | tipo IDENTIFICADOR corchetes_vacios   { $$ = new Nodo('parametros2'); $$.agregarHijo($1); $$.agregarHijo(new Nodo($2)); $$.agregarHijo($3); }
;

llamada_funcion
    : IDENTIFICADOR PARENTESIS_ABRE lista_expresiones PARENTESIS_CIERRA { $$ = new Nodo('llamada_funcion'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo(new Nodo('(')); $$.agregarHijo($3); $$.agregarHijo(new Nodo(')')); } 
    | IDENTIFICADOR PARENTESIS_ABRE PARENTESIS_CIERRA                   { $$ = new Nodo('llamada_funcion'); $$.agregarHijo(new Nodo($1)); $$.agregarHijo(new Nodo('(')); $$.agregarHijo(new Nodo(')')); } 
;
