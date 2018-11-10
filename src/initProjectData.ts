export default {
  node_modules: {
    type: 'FOLDER',
    children: {
      src: {
        type: 'FOLDER',
        children: {
          'index.js': {
            type: 'FILE',
            content: 'Hello World'
          }
        }
      }
    }
  }
}
