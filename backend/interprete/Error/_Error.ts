export class _Error {
    constructor(public linea: number, public columna: number, public tipo: string, public mensaje: string, public token?:string) {
        
    }
}