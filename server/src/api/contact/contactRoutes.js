import { Router } from "express";
import createHttpError from "http-errors";
import { checkContactSchema, triggerBadRequest } from "./contactValidator.js";
import { parsePhoneNumber } from "libphonenumber-js";
import sendContactInfoMail from "../../tools/email-tools.js";
import Contact from "./contactModel.js";

const contactRoutes = new Router();
contactRoutes.post("/", checkContactSchema, triggerBadRequest, async (req, res, next) => {
  try {
    // Check for duplicate contacts
    const { firstName, lastName, email, phone, message } = req.body;
    const existingContact = await Contact.findOne({ firstName, lastName, email });

    if (existingContact) {
      return res.status(400).send({
        code: 400,
        message:
          "A contact with the same first name, last name, and email already exists. Please try with another email.",
      });
    }

    // Format phone number before saving
    const phoneNumber = parsePhoneNumber(req.body.phone);
    const formattedNumber = phoneNumber.format("E.164");
    const countryCodeLength = phoneNumber.countryCallingCode.length;
    req.body.phone = `+${phoneNumber.countryCallingCode}-${formattedNumber.slice(countryCodeLength + 1)}`;
    req.body.country = phoneNumber.country;

    const contact = new Contact(req.body);
    await contact.save();

    await sendContactInfoMail(firstName, lastName, email, phone, message);
    res.status(201).send({ code: 201, message: "Contact saved successfully" });
  } catch (error) {
    console.log(`ERROR - POST contact: `, error);
    res.status(error.status || 500).send({ code: error.status || 500, message: error.message });
  }
});

export default contactRoutes;
