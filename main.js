const { app, BrowserWindow } = require('electron')

let win

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600, frame:false })

  win.loadFile('app/views/index.html')
  //win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })

  win.webContents.addListener('will-navigate', (e) => {
    e.preventDefault()
  })
}

app.on('ready', () => {
  if (process.env.NODE_ENV !== 'production') {
    createWindow()
    //require('vue-devtools').install()
  }
})

app.on('window-all-closed', () => {
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})