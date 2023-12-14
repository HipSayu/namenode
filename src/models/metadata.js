import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const metaData = new Schema({
    nameFile: { type: String, maxLength: 255 },
    desc: { type: String, maxLength: 255 },
    indexFile: { type: Number },
    NumberChunk : { type: Number }, 
    DataNode: { type: String },
    DatanodeReplication1: { type: String },
    DatanodeReplication2: { type: String },
});

module.exports = mongoose.model('metaData', metaData);
