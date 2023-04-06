import { Router } from "express";
import Contact from "../contact/contactModel.js";

const cleanBD_Router = new Router();

cleanBD_Router.delete("/delete-all-contacts-db", async (req, res, next) => {
  try {
    await Contact.deleteMany({});
    res.send({ message: `All contacts in the db successfully deleted!` });
  } catch (error) {
    console.log(`DELETE ALL CONTACTS IN DB error: `, error);
    next(error);
  }
});

export default cleanBD_Router;
