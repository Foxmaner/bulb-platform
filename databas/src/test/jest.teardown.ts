import mongoose from 'mongoose';

module.exports = async function globalTeardown() {
    await mongoose.connection.close();
    await mongoose.disconnect();
}