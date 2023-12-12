import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// const TIME_HEARTBEAT = process.env.HEART_BEAT_INTERVAL_TIME;
const NAME_NODE_ADDRESS = process.env.NAME_NODE_ADDRESS;
const NAME_NODE_PATH = process.env.NAME_NODE_PATH;
const nameNodeEndPoint = 'http://'
    .concat(NAME_NODE_ADDRESS)
    .concat(NAME_NODE_PATH);

const readUser = () => {
    axios.post(nameNodeEndPoint, {
        Clients: 'Clients 1',
        description: 'NameNode 1 sent Request',
        Collection: 'users',
        Request: 'Read ',
        time: new Date(),
    });
    console.log('complete send request');
};
module.exports = {
    readUser,
};
