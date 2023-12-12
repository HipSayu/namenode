import nameNode from '../models/nameNode';
const checkDataNode = async (req, res) => {
    await nameNode.find({}).then((data, err) => {
        data = data[0];
        data = data.DataNode;
    });
    return data;
};

module.exports = {
    checkDataNode,
};
