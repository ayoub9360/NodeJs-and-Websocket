import io from 'socket.io-client'
const API_URL = 'http://localhost:3000'
const socket = io(API_URL)

export default socket
