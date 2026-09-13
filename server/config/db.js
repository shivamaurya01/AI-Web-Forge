// import mongoose from "mongoose"

// const connectDb = async ()=>{
//     try{
//         await mongoose.connect(process.env.MONGODB_URL)
//         console.log("db Connected");
//     }catch(error){
//         console.log("db Error");
//         console.log(error);
//     }
// }
// export default connectDb;


import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("DB Connected");

    } catch (error) {
        console.error("DB Connection Error:");
        console.error(error.message);

        throw error;
    }
};

export default connectDb;

