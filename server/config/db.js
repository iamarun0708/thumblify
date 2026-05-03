const mongoose = require("mongoose");

// Fallback: convert mongodb+srv:// to direct connection string
// when Node.js SRV DNS lookup fails (common on IPv6 networks)
const getDirectURI = (srvURI) => {
  const match = srvURI.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?]+)(.*)/);
  if (!match) return srvURI;
  const [, user, pass, host, rest] = match;
  const cluster = host.split(".").slice(0, -2).join(".");
  const domain = host.split(".").slice(-2).join(".");
  // Use the resolved SRV targets directly
  const hosts = [
    `ac-wqqao56-shard-00-00.fweuxm9.mongodb.net:27017`,
    `ac-wqqao56-shard-00-01.fweuxm9.mongodb.net:27017`,
    `ac-wqqao56-shard-00-02.fweuxm9.mongodb.net:27017`
  ].join(",");
  const params = rest.startsWith("/") ? rest : `/${rest}`;
  const separator = params.includes("?") ? "&" : "?";
  return `mongodb://${user}:${pass}@${hosts}${params}${separator}ssl=true&authSource=admin`;
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    if (error.message.includes("querySrv ECONNREFUSED")) {
      console.warn("SRV lookup failed, trying direct connection...");
      try {
        const directURI = getDirectURI(process.env.MONGO_URI);
        await mongoose.connect(directURI);
        console.log("MongoDB connected (direct)");
        return;
      } catch (fallbackError) {
        console.error("Direct connection also failed:", fallbackError.message);
      }
    }
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
