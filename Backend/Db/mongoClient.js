import { MongoClient } from "mongodb";

export const client = new MongoClient(process.env.DB_URL);

export const connectMongoClient = async () => {
    try {
        await client.connect();
        console.log("MongoDB native client connected");
        return client.db("DSCH");
    } catch (err) {
        console.error("Mongo client connection error", err);
        process.exit(1);
    }
};