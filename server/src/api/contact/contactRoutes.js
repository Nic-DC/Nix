import { Router } from "express";
import createHttpError from "http-errors";
import { checkContactSchema, triggerBadRequest } from "./contactValidator.js";
import { parsePhoneNumber } from "libphonenumber-js";
import Contact from "./contactModel.js";

const contactRoutes = new Router();

contactRoutes.post("/", checkContactSchema, triggerBadRequest, async (req, res, next) => {
  try {
    // Check for duplicate contacts
    const { firstName, lastName, email } = req.body;
    const existingContact = await Contact.findOne({ firstName, lastName, email });

    if (existingContact) {
      throw createHttpError(
        400,
        "A contact with the same first name, last name, and email already exists. Please try with another email."
      );
    }

    // Format phone number before saving
    const phoneNumber = parsePhoneNumber(req.body.phone);
    const formattedNumber = phoneNumber.format("E.164");
    const countryCodeLength = phoneNumber.countryCallingCode.length;
    req.body.phone = `+${phoneNumber.countryCallingCode}-${formattedNumber.slice(countryCodeLength + 1)}`;
    req.body.country = phoneNumber.country;

    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send({ message: "Contact saved successfully" });
  } catch (error) {
    console.log(`ERROR - POST contact: `, error);
    next(error);
  }
});

export default contactRoutes;
