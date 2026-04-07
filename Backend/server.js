import express from 'express'   
import { createServer } from 'http'
import { Server } from 'socket.io'
import { YSocketIO } from 'y-socket.io/dist/server'

const app = express()
const httpServer = createServer(app)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' ,
    success: true
  })
})

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' ,
    success: true
  })
})

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

const ySocketIO = new YSocketIO(io)
ySocketIO.initialize()


httpServer.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
