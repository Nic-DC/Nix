import { Router } from "express";
import createHttpError from "http-errors";
import { checkContactSchema, triggerBadRequest } from "./contactValidator.js";
import Contact from "./contactModel.js";

const contactRoutes = new Router();

contactRoutes.post("/", checkContactSchema, triggerBadRequest, async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send({ message: "Contact saved successfully" });
  } catch (error) {
    console.log(`ERROR - POST contact: `, error);
    next(createHttpError(500, "An error occurred while saving the contact"));
  }
});

export default contactRoutes;
