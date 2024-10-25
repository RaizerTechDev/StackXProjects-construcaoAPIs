const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB conectado!");
    } catch (error) {
        console.error("Erro na conexão com o MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;



