let {
    remote,
    shell
} = require('electron')
let {
    app,
    dialog
} = remote
let isDev = require('electron-is-dev')
let Vue = require(isDev ? '../scripts/vue.dev' : '../scripts/vue.js')
let vtj = require('vue-to-js')
let path = require('path')


let vueApp = new Vue({
    el: '#root',
    data() {
        return {
            files: [],
            mode: 'umd'
        }
    },
    methods: {
        Compile() {
            this.files.forEach(file => {
                file.status = ''
                try {
                    vtj.compile({
                        resource: file.path,
                        dest: path.dirname(file.path),
                        mode: this.mode
                    })
                    file.status = 'success'
                } catch (e) {
                    file.status = 'fail'
                    console.warn(e);
                }
            })
        },
        LoadFiles() {
            let files = dialog.showOpenDialog({
                properties: ['openFile', 'showHiddenFiles', 'multiSelections'],
                filters: [{
                        name: 'Vue File Extension',
                        extensions: ['vue']
                    },
                    {
                        name: '',
                        extensions: ['*']
                    },
                ]
            })
            if (Array.isArray(files)) {
                files.forEach((file) => {
                    this.files.push({
                        path: file,
                        status: ''
                    })
                })
            }
        },
        ShowFile(path) {
            shell.showItemInFolder(path)
        },
        RemoveFiles() {
            this.files = []
        },
        RemoveFile(index) {
            this.files.splice(index, 1)
        },
        FileStatus(index) {
            let status = ''
            if (this.files[index]) {
                if (this.files[index].status == 'success')
                    status = ' positive'
                else if (this.files[index].status == 'fail')
                    status = ' negative'

            }
            return status
        }
    },
    computed: {
        windowTitle : function () {
            return `${app.getName()} (${app.getVersion()})`  
        }
    }
})

document.ondragover = document.ondrop = (ev) => {
    ev.preventDefault()
}

document.body.ondrop = (ev) => {
    try {
        let files = Array.from(ev.dataTransfer.files)
        console.log(files);
        files.forEach(file => {
            vueApp.files.push({
                path: file.path,
                status: ''
            })
        })
    } catch (e) {
        console.log(e);
    }

    ev.preventDefault()
}