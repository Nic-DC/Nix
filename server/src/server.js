import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import cors from "cors";
import createHttpError from "http-errors";
import contactRoutes from "./api/contact/contactRoutes.js";
import { badRequestHandler, notFoundHandler, genericErrorHandler } from "./errorHandlers.js";

const server = express();
const { PORT, MONGO_URL, FE_DEV_URL, FE_PROD_URL } = process.env;

const port = PORT;

const whitelist = [FE_DEV_URL, FE_PROD_URL];

const corsOpts = {
  origin: (origin, corsNext) => {
    console.log(`The current origin is: ${origin}`);
    if (whitelist.indexOf(origin) !== -1) {
      corsNext(null, true);
    } else {
      corsNext(createHttpError(400, `The ${origin} is not in the whitelist`));
    }
  },
};

// ******************************* MIDDLEWARES ****************************************
server.use(cors(corsOpts));
server.use(express.json());

// ********************************** ROUTES ******************************************
server.use("/contact", contactRoutes);

// ***************************** ERROR HANDLERS ***************************************
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

// ***************************** RUNNING SERVER ***************************************
const mongooseUrl = MONGO_URL;
mongoose.connect(mongooseUrl);
mongoose.connection.on("connected", () => {
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`The server is running on PORT: ${port}`);
  });
});
