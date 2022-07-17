const express = require('express')
const app = express()

app.use(express.json())
const PORT = process.env.port || 8080

let entries = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/info', (req, res) => {
    const l = phoneEntries.length
    res.send(`Phonebook has info for ${l} people <br/> ${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.json(entries)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const result = entries.find(entry => entry.id === id)
    console.log(result)
    if (result) {
        res.json(result)
    } else {
        res.status(400).end()
    }
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'content missing' 
        })
    }

    function checkDuplicate() {
        for (const entry in entries) {
            if (entries[entry].name === body.name) {
                return true
            }
        }
        return false
    }

    if (!checkDuplicate()) {
        const newEntry = {
            id: parseInt(Math.random() * 10**6),
            name: body.name,
            number: body.number
        }
    
        entries.push(newEntry)
        res.json(newEntry)
    } else {
        res.status(404).json({
            error: 'name must be unique'
        })
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    entries = entries.filter(entry => entry.id !== id)
    res.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})