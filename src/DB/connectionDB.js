import { MongoClient } from'mongodb';

const url = 'mongodb://127.0.0.1:27017';
export const client = new MongoClient(url);
export const connectionDB = async()=>{
    await client.connect()
    .then(()=>{
        console.log(`connected successfully to server `);
        
    })
    .catch((err)=>{
        console.log(`Error connecting to MongoDB :`, err);
        
    })
}