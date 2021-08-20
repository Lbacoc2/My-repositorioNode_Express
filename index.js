const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'Hola como estas, que haces',
    date: '2021-08-20T17:30:31.098Z',
    important: false
  },
  {
    id: 2,
    content: 'Tengo que estudiar las clases construccion de software',
    date: '2021-08-20T18:39:34.091Z',
    important: true
  },
  {
    id: 3,
    content: 'Estudiar programacion te ayuda a ser un buen programador',
    date: '2021-08-20T19:20:14.298Z',
    important: true
  }
]

const generateId = () => {
  const notesIds = notes.map(n => n.id)
  const maxId = notesIds.length ? Math.max(...notesIds) : 0
  const newId = maxId + 1
  return newId
}

app.get('/', (request, response) => {
  response.send('<h1>Hi! Usuario</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    return response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note.content) {
    return response.status(400).json({
      error: 'Hay un error no se cual es pero es un error perdido XD, field is missing '
    })
  }

  const newNote = {
    id: generateId(),
    content: note.content,
    date: new Date(),
    import: note.important || false
  }

  notes = notes.concat(newNote)

  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Este servidor se esta corriendo en este puerto ${PORT}`)
})