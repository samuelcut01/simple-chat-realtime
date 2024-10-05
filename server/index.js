import express from 'express'
import logger from 'morgan'
import sqlite3 from 'sqlite3'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000
const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {},
})

const db = new sqlite3.Database('chat.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message)
  } else {
    console.log('Connected to the SQLite database')

    db.run(
      `CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT
    )`,
      (err) => {
        if (err) {
          console.error('Error creating the table: ', err.message)
        }
      }
    )
  }
})

io.on('connection', (socket) => {
  console.log('A user has connected!')

  socket.on('disconnect', () => {
    console.log('A user has disconnected')
  })

  socket.on('chat message', (msg) => {
    db.run('INSERT INTO messages (content) VALUES (?)', [msg], function (err) {
      if (err) {
        console.error('Error saving the message to the database', err.message)
        return
      }
      io.emit('chat message', msg, this.lastID.toString())
    })
  })

  if (!socket.recovered) {
    try {
      db.all(
        'SELECT id, content FROM messages WHERE id > ?',
        [socket.handshake.auth.serverOffset ?? 0],
        (err, rows) => {
          if (err) {
            console.error(err)
            return
          }
          rows.forEach((row) => {
            socket.emit('chat message', row.content, row.id.toString())
          })
        }
      )
    } catch (e) {
      console.error(e)
    }
  }
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
