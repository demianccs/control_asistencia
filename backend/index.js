
const express = require('express');


const bodyParser = require('body-parser');

const cors = require('cors');

const http = require('http');

//const WebSocket = require('ws');
const socketIo = require('socket.io');
const WebSocket = require('ws');

//Creamos el servidor
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/marcaciones', require('./routes/marcaciones'));

app.use('/user', require('./routes/user'));

app.use('/horaservidor', require('./routes/horaservidor'));

app.use('/enviocorreo', require('./routes/correo'));

//Definimos nueva ruta principal
/* app.get('/', (req,res) => {
    res.send('Hola mundo');-
}) */

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Crea un nuevo WebSocketServer
// const wss = new WebSocket.Server({ server });

// // Maneja la conexión de WebSocket
// wss.on('connection', (ws) => {
//     // Maneja los mensajes entrantes
//     ws.on('message', (message) => {
//       // Procesa el mensaje recibido
//       console.log('Mensaje recibido: ', message);
  
//       // Envía una respuesta al cliente
//       ws.send('¡Hola desde el servidor!');
//     });
  
//     // Maneja el cierre de la conexión
//     ws.on('close', () => {
//       console.log('Conexión cerrada');
//     });
//   });

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');
  
    socket.on('location', (location) => {
      console.log('Nueva ubicación recibida: ', location);
      // Emitir la nueva ubicación a todos los demás usuarios conectados
      socket.broadcast.emit('new-location', location);
    });
  
    socket.on('disconnect', () => {
      console.log('Un usuario se ha desconectado');
    });
  });

server.listen(port,()=>{console.log(`api-marcaciones up on : ${port}`)
});
