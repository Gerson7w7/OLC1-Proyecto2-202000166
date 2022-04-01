const express = require('express');
const { Scope } = require('./dist/Extra/Scope');
const cors = require('cors');
const parser = require('./interprete/Gramatica/grammar');

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.post('/grammar', (req, res) => {
    const resp = req.body
    const grammar = resp.grammar
    const result = parser.parse(grammar)
    let response = []
    console.log(grammar)
    try {
        const scope = new Scope(null)
        for (const inst of result) {
            response.push(inst.execute(scope))
        }

    } catch (error) {
        console.log(error)
    }

    res.send(response)
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})