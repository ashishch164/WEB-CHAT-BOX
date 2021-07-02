let socket = io()
$('#loginbox').show()
$('#chatbox').hide()

$('#btnstart').click(() => {
    socket.emit('login', {
        username: $('#inpusername').val(),
        password: $('#inppassword').val()
    })
})
socket.on('logged_in', () => {
    $('#loginbox').hide()
    window.alert('Sucessfully logged in')
    $('#chatbox').show()

})
socket.on('login_failed', () => {
    window.alert('wrong username or password')
})

$('#btnsendmsg').click(() => {
    socket.emit('msg_send', {
        to: $('#inptouser').val(),
        msg: $('#inpnewmsg').val()

    })
})


socket.on('msg_rcvd', (data) => {
    $('#ulmsgs').append($('<li>').text(
        `${data.from} :   ${data.msg}`
    ))
    console.log(data.from)
})
function myFunction() {
    var x = document.getElementById("inppassword");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

