import io from 'socket.io-client';
const sockets = io('https://learn-online-app.herokuapp.com:8000', { autoConnect: true, forceNew: true });
// const sockets = io('/');
export default sockets;
