import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const nameNode = new Schema({
    NameNodeID :{ type: String, maxLength: 255 },
    DataNode: { type: Object },
    DataNode_Dead: { type: Object },
    DataNodeSize:{ type: Object },
});

module.exports = mongoose.model('nameNode', nameNode);
