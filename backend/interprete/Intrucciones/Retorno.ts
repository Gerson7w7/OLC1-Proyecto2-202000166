import { Retorno as Retorno2 } from "../Expresion/Retorno"
import { transferencia } from "./Transferencias"

export type Retorno = {
    output: string,
    transferencia: transferencia
    retorno: Retorno2
}