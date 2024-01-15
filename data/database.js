const { mongoose } = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL, {
    dbName: "ChatterBox",
  });
  console.log("Database connected");
}

connectDB().catch((err) => console.log(err));
