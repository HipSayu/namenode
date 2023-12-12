import mongoose from 'mongoose';

async function mongooseBD() {
    try {
        await mongoose
            .connect(`mongodb://localhost:27017/NameNode`)
            .then(() => {
                console.log('Connected!');
            });
    } catch (error) {
        console.log('Connect fail');
    }
}
module.exports = {
    mongooseBD,
};
