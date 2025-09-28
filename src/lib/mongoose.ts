import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || '';

declare global {
    // eslint-disable-next-line no-var
    var __mongooseClient__: typeof mongoose | undefined;
}

export async function connectMongoose() {
    if (!MONGO_URI) return null;
    if (global.__mongooseClient__ && mongoose.connection.readyState === 1) {
        return global.__mongooseClient__;
    }
    const client = await mongoose.connect(MONGO_URI);
    // store to global to avoid multiple connections in dev
    global.__mongooseClient__ = client;
    return client;
}

export default connectMongoose;
