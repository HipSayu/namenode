import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ManagerDataNode = new Schema({
    NameNodeID :{ type: String, maxLength: 255 },
    dataNode1: { type: Object },
    dataNode2: { type: Object },
    dataNode3: { type: Object },
    dataNode4: { type: Object },
});

module.exports = mongoose.model('ManagerDataNode', ManagerDataNode);
