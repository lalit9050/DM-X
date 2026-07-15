import mongoose from "mongoose";
import dns from "dns"

dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongo db connected")
    } catch (error) {
        console.log("mongo db error")
    }
}

export default connectDb