import mongoose from "mongoose";

async function conectaNaDatabase(){
    mongoose.connect("mongodb+srv://admin:admin123@cluster0.dktoqen.mongodb.net/?appName=Cluster0");
    return mongoose.connection;
};


// async function conectaNaDatabase(){

//     const uri = process.env.MONGODB_URI || "mongodb+srv://admin:admin123@cluster0.dktoqen.mongodb.net/?appName=Cluster0";

//     if(mongoose.connection.readyState === 1){
//         return mongoose.connection
//     }

//     await mongoose.connect(uri,{
//         dbName: process.env.MONGODB_DB || "gead",
//     });

// return mongoose.connection;
// };

export default conectaNaDatabase;


