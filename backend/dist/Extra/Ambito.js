"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambito = void 0;
const Error_1 = require("../Error/Error");
const Simbolo_1 = require("./Simbolo");
class Ambito {
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
    }
    setVal(id, value, type, line, column) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                const val = env.variables.get(id);
                if (val.type == type) {
                    env.variables.set(id, new Simbolo_1.Simbolo(value, id, type));
                }
                else {
                    throw new Error_1.Error_(line, column, 'Semantico', 'No se puede asignar: ' + type + ' a ' + val.type);
                }
            }
            env = env.anterior;
        }
        this.variables.set(id, new Simbolo_1.Simbolo(value, id, type));
    }
    getVal(id) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
}
exports.Ambito = Ambito;
//# sourceMappingURL=Ambito.js.map