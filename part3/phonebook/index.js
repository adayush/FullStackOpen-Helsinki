const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

var morgan = require('morgan')

// Alternate to a new custom token
// app.use(morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms',
//     JSON.stringify(req.body)
//   ].join(' ')
// }))
morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people\n${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  const person = persons.find(person => person.id === parseInt(id))
  console.log(id, person)
  if (person) {
    res.json(person)
  } else {
    res.status(400).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(person => person.id !== Number(req.params.id))

  response.status(204).end()
})

app.post('/api/persons', (req, res) => {
  if(!req.body.name || !req.body.number) {
    res.status(400).end()
  } else {
    const exists = persons.find(person => person.name === req.body.name)
    if (exists) {
      res.status(400).send({
        error: 'name must be unique'
      })
    } else {
      const person = {
        id: Math.floor(Math.random() * 100000),
        name: req.body.name,
        number: req.body.number
      }
      persons.push(person)
      res.json(person)
    }
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on part ${PORT}`)
})
