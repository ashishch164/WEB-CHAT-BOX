const http = require('http')

const express = require('express')

const app = express()

const socketio = require('socket.io')

const server = http.createServer(app)

const io = socketio(server)
let users = {
    'aky1': 'aky1'
}
let socketmap = {}
io.on('connection', function (socket) {
    console.log('connected with socket with id - ', socket.id)

    function login(s, u) {
        s.join(u)
        s.emit('logged_in')
        socketmap[s.id] = u
        console.log(socketmap)

    }
    socket.on('login', (data) => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                login(socket, data.username)
            } else {
                socket.emit('login_failed')
            }

        } else {
            users[data.username] = data.password
            login(socket, data.username)

        }
        console.log(users)
    })

    socket.on('msg_send', (data) => {
        data.from = socketmap[socket.id]
        if (data.to) {
            io.to(data.to).emit('msg_rcvd', data)
        } else {
            io.emit('msg_rcvd', data)
        }
    })
})

app.use('/', express.static('public'))

server.listen(1234, function () {
    console.log('started on http://localhost:1234')

})