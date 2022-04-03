%{
    const { Aritmetica, TipoAritmetica } = require("../Expresion/Aritmetica");
    const { Relacional, TipoRelacional } = require("../Expresion/Relacional");
    const { Literal, TipoLiteral } = require("../Expresion/Literal");
    const { Print, Println } = require("../Intrucciones/Imprimir");
    const { Acesso } = require("../Expresion/Acceso");
    const { Declaracion, AsignacionSimple } = require("../Intrucciones/Declaracion");
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
'((.)|(\\.))'\b         	{ yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
[0-9]+("."[0-9]+)\b  	    return 'DECIMAL';
[0-9]+\b				    return 'ENTERO';
([a-zA-Z_])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';
<<EOF>>				        return 'EOF';
.					        {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext)}

/lex

%left 'OR'
%left 'AND'
%right 'NOT'
%left 'MODULO' casteo
%left 'IGUAL' 'DESIGUAL' 'MENOR' 'MENOR_IGUAL' 'MAYOR' 'MAYOR_IGUAL'
%left 'SUMA' 'RESTA'
%left 'MULTIPLICACION' 'DIVISION'
%left 'POTENCIA'
%right UNMENOS

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
    : MENOS expresion %prec UNMENOS                         { $$ = new Aritmetica($2, new Literal("-1", TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column) } 
    | expresion SUMA expresion                              { $$ = new Aritmetica($1, $3, TipoAritmetica.SUMA, @1.first_line, @1.first_column) }
    | expresion RESTA expresion                             { $$ = new Aritmetica($1, $3, TipoAritmetica.RESTA, @1.first_line, @1.first_column) }
    | expresion MULTIPLICACION expresion                    { $$ = new Aritmetica($1, $3, TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column) }
    | expresion DIVISION expresion                          { $$ = new Aritmetica($1, $3, TipoAritmetica.DIVISION, @1.first_line, @1.first_column) }
    | expresion POTENCIA expresion                          { $$ = new Aritmetica($1, $3, TipoAritmetica.POTENCIA, @1.first_line, @1.first_column) }
    | expresion MODULO expresion                            { $$ = new Aritmetica($1, $3, TipoAritmetica.MODULO, @1.first_line, @1.first_column) }
    | PARENTESIS_ABRE expresion PARENTESIS_CIERRA           { $$ = $2 }
    | ENTERO                                                { $$ = new Literal($1, TipoLiteral.ENTERO, @1.first_line, @1.first_column) }
    | DECIMAL                                               { $$ = new Literal($1, TipoLiteral.DECIMAL, @1.first_line, @1.first_column) }
    | TRUE                                                  { $$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line, @1.first_column) }
    | FALSE                                                 { $$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line, @1.first_column) }
    | CARACTER                                              { $$ = new Literal($1, TipoLiteral.CARACTER, @1.first_line, @1.first_column) }
    | CADENA                                                { $$ = new Literal($1, TipoLiteral.CADENA, @1.first_line, @1.first_column) }
    | IDENTIFICADOR                                         { $$ = new Acesso($1, @1.first_line, @1.first_column) }
;

imprimir
    : PRINT PARENTESIS_ABRE expresion PARENTESIS_CIERRA     { $$ = new Print($3, @1.first_line, @1.first_column) }
    | PRINTLN PARENTESIS_ABRE expresion PARENTESIS_CIERRA   { $$ = new Println($3, @1.first_line, @1.first_column) }
;