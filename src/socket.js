import io from 'socket.io-client';
const sockets = io('https://learn-online-socket.herokuapp.com/', { autoConnect: true, forceNew: true });
// const sockets = io('/');
export default sockets;
