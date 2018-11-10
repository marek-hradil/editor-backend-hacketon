import * as R from 'ramda'

// Events
const bar = (app, socket) => ({
  getCurrentState: getCurrentState(app, socket),
  updateFile: updateFile(app, socket),
  createFile: createFile(app, socket),
  renameFile: renameFile(app, socket),
  deleteFile: deleteFile(app, socket),
})


// TODO: add validation
interface IUpdateFileArgs {
  path: string[]
  newContent: string
}

// works for files and folders
// typeText -> onTypeText
const getCurrentState = (app, socket) => () => {
  app.allSockets.forEach(soc => {
    soc.emit('onGetCurrentState', {
      opened: app.opened,
      files: app.projectWorkspace
    })
  })
}


// works for files and folders
// typeText -> onTypeText
const updateFile = (app, socket) => (data: IUpdateFileArgs) => {
  // Broadcast message to all sockets
  app.projectWorkspace = R.assocPath(
    [...data.path, 'content'],
    data.newContent,
    app.projectWorkspace
  )
  app.allSockets.forEach(soc => {
    // cesta k souboru
    // content souboru
    soc.emit('onUpdateFile', data)
  })
  console.log(JSON.stringify(app.projectWorkspace, null, 2))
}


// TODO: add validation
interface ICreateFileArgs {
  path: string[]
  name: string
}
// works for files and folders
// createFile -> newFile
const createFile = (app, socket) => (data: ICreateFileArgs) => {
  // Broadcast message to all sockets
  console.log('createFile', data)
  app.projectWorkspace = R.assocPath(
    [...data.path, 'children', data.name],
    { type: 'FILE', content: '' },
    app.projectWorkspace
  )
  app.allSockets.forEach(soc => {
    // cesta k souboru
    soc.emit('onCreateFile', data)
  })
  console.log(JSON.stringify(app.projectWorkspace, null, 2))
}


/*
{
  path: ["node_modules", "index.js"]
  newName: "index.ts"
}
*/
// TODO: add validation
interface IRenameFileArgs {
  path: string[]
  newName: string
}
// works for files and folders
// renameFile -> onRenameFile
const renameFile = (app, socket) => (data: IRenameFileArgs) => {
  // Broadcast message to all sockets
  // app.projectWorkspace = R.assocPath([...data.path, 'name'], app.projectWorkspace)
  app.allSockets.forEach(soc => {
    // cesta k souboru
    soc.emit('onRenameFile', data)
  })
  console.log(JSON.stringify(app.projectWorkspace, null, 2))
}


// remove recursive all nested files/folders
// TODO: add validation
interface IDeleteFileArgs {
  path: string[]
}
// works for files and folders
// deleteFile -> onDeleteFile
const deleteFile = (app, socket) => (data: IDeleteFileArgs) => {
  // Broadcast message to all sockets
  app.projectWorkspace = R.dissocPath(data.path, app.projectWorkspace)
  app.allSockets.forEach(soc => {
    // cesta k souboru
    soc.emit('onDeleteFile', data)
  })
  console.log(JSON.stringify(app.projectWorkspace, null, 2))
}


export default bar
