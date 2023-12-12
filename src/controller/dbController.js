import nameNode from '../models/nameNode';

//nameNode
const handleReadDB = async (req, res, next) => {
    await nameNode
        .find({})
        .then((result) => res.json(result))
        .catch((error) => next(error));
};

const HandleWriteDB = async (req, res, next) => {
    const dataFake = [
        {
            name: 'Data Node 1',
            description: 'This is Data about user of Data Node 1',
        },
        {
            name: 'Data Node 1',
            description: 'This is Data about account of Data Node 1',
        },
        {
            name: 'Data Node 1',
            description: 'This is Data about files of Data Node 1',
        },
    ];
    await nameNode
        .insertMany(dataFake)
        .then(res.json('Write Succesfully'))
        .catch((error) => next(error));
};

module.exports = {
    handleReadDB,
    HandleWriteDB,
};
