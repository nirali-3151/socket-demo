module.exports = (io, socket) => {

    const connection = function () {
        console.log("user connected");
    }

    const joinRoom = function (data) {
        socket.join(data);
        console.log("User Joined Room: " + data);
    }


    const sendMessage = function (data) {
        console.log(data);
        socket.to(data.room).emit("receive_message", data.content);
    }

    const disconnect = function () {
        console.log("USER DISCONNECTED")
    }

    socket.on("join_room", joinRoom)
    socket.on("send_message", sendMessage)
    socket.on("disconnect" ,disconnect)
    socket.on("connection",connection)

}