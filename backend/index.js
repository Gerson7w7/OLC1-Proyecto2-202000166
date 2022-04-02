const express = require('express');
const { Scope } = require('./dist/Extra/Scope');
const cors = require('cors');
const parser = require('./interprete/Gramatica/grammar');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.post('/grammar', (req, res) => {
    const data = req.body;
    console.log("soy backend");
    console.log(data.data);

    const ast = parser.parse(data.data);
    console.log(ast);
    const scope = new Scope(null);
    try {
      for(const inst of ast){
        inst.ejecutar(scope);
      }
    } catch (error) {
      console.log(error)
    }
    res.send({"data":"sisoi"});
})

const PORT = 9000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})