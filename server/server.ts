import express from "express";
import { Request, Response } from "express";
import api from "./api";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";

// Load in environment variables
dotenv.config();

// Set fields to be accessed from the req.session JSON object
declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}

// Check environment variables
const mongoConnection = process.env.MONGO_SRV;
if (!mongoConnection) {
  throw new Error(
    "Please add the Mongo SRV as an environment variable named MONGO_SRV"
  );
} else if (!process.env.SECRET)
  throw new Error(
    "Please add a session secret in the environment variable named SECRET"
  );

// Connect to MongoDB
const client = mongoose
  .connect(mongoConnection)
  .then((mongo) => {
    console.log("Connected to Mongo");
    return mongo.connection.getClient();
  })
  .catch((err) => {
    throw new Error(`Error connecting to Mongo; ${err}`);
  });

// Create the express application
const app = express();

// Set the port for the server to listen to
const port = process.env.PORT || 3000;

// Allow our server to process JSON
app.use(express.json());

// Set up sessions stored in Mongo
// See https://www.npmjs.com/package/express-session#options
// and https://www.npmjs.com/package/connect-mongo
// for more information
app.use(
  session({
    resave: false, // Do not continiously resave session data; see store settings below
    saveUninitialized: false, // Do not save sessions that are not initialized
    secret: process.env.SECRET, // Secret for signing cookie
    store: MongoStore.create({
      clientPromise: client, // Utilize previous connnection to Mongo
      touchAfter: 24 * 3600, // Resave session data once every 24 hours
    }),
  })
);

// Connect all API requests
app.use("/api", api);

// Allow serving of static files from dist
const staticPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(staticPath));

// Catch unmatched paths, and send back index.html so react-router can handle it
app.all("*", (req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Create the server and listen on the specified port
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
