let {
    remote,
    shell
} = require('electron')
let {
    app,
    dialog
} = remote
let isDev = require('electron-is-dev')
//let Vue = require('../scripts/vue.dev.js')
let Vue = require('../scripts/vue.js')
let vueMessage = require('../scripts/vue-message')
let vtj = require('vue-to-js')
let path = require('path')

Vue.use(vueMessage, {
    messageText:'message test',
    duration: 3000,
    background: 'rgba(0,0,0,0.5)'
})

let vueApp = new Vue({
    el: '#root',
    data() {
        return {
            files: [],
            mode: 'umd',
            msg : 'message'
        }
    },
    components: {
        'vue-message':vueMessage
    },
    methods: {
        Compile() {
            this.files.forEach(file => {
                try {
                    file.status = 'compiling'
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

            this.UpdateStorage()
            this.$msg({text:'未曾遗忘的青春', background: 'red'})
            shell.beep()
            let compileNotification = new Notification('Vue Compiler', {
                body: 'Compile proccess finished'
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
                this.UpdateStorage()
            }
        },
        UpdateStorage() {
            localStorage.setItem('files', JSON.stringify(this.files))
        },
        ShowFile(path) {
            shell.showItemInFolder(path)
        },
        RemoveFiles() {
            this.files = []
            this.UpdateStorage()
        },
        RemoveFile(index) {
            this.files.splice(index, 1)
            this.UpdateStorage()
        },
        FileStatus(index) {
            let status = ''
            if (this.files[index]) {
                if (this.files[index].status == 'success')
                    status = ' positive'
                else if (this.files[index].status == 'compiling')
                    status = ' compiling'
                else if (this.files[index].status == 'fail')
                    status = ' negative'

            }
            return status
        },
        CloseApp() {
            app.quit()
        }
    },
    computed: {
        windowTitle: function () {
            return `${app.getName()} (${app.getVersion()})`
        }
    },
    mounted() {
        let files = JSON.parse(localStorage.getItem('files'))
        if (Array.isArray(files))
            this.files = files
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
        vueApp.UpdateStorage()
    } catch (e) {
        console.log(e);
    }

    ev.preventDefault()
}