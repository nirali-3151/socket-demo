const joinRoom = require('../socketHandler/messageHandler')
const {io } = require('../index')
 
const onConnection = (socket) => {
    joinRoom(io,socket)
}


module.exports = onConnection