import { Server } from 'socket.io'
// import foo from './foo'
import editorTyping from './editorTyping'
import initProjectData from '../initProjectData'
// --------------------------------------
// -------- SOCKET.IO handlers ----------
// --------------------------------------

const appData = {
  // TODO: wrap to worksapceState
  opened: ['node_modules', 'abc', 'index.js'],
  projectWorkspace: initProjectData,
  allSockets: []
}
// structure inspired by
// https://stackoverflow.com/questions/20466129/how-to-organize-socket-handling-in-node-js-and-socket-io-app
export default (io: Server) => {
  // editor room
  io.on('connection', (socket) => {
    console.log('connectnul se')
    const eventHandlers = [
      // foo(appData, socket),
      editorTyping(appData, socket)
    ]

    // Bind events to handlers
    eventHandlers.forEach(handler => {
      // tslint:disable-next-line
      for (let eventName in handler) {
        socket.on(eventName, handler[eventName])
      }
    })

    // Keep track of the socket
    appData.allSockets.push(socket)
  })
}
