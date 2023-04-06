import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";
import { parsePhoneNumber } from "libphonenumber-js";

const contactSchema = {
  firstName: {
    in: ["body"],
    isString: {
      errorMessage: "First name is a mandatory field",
    },
  },
  lastName: {
    in: ["body"],
    isString: {
      errorMessage: "Last name is a mandatory field",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email is a mandatory field",
    },
  },
  phone: {
    in: ["body"],
    custom: {
      options: (value, { req }) => {
        // Check if the phone number starts with a '+' sign followed by digits
        if (!value.match(/^\+\d+/)) {
          throw new Error("Phone number must include a country code prefix (e.g., +1 for the United States)");
        }

        const phoneNumber = parsePhoneNumber(value);
        if (!phoneNumber || !phoneNumber.isValid()) {
          throw new Error("Invalid phone number");
        }

        return true;
      },
    },
  },
};

export const checkContactSchema = checkSchema(contactSchema);
export const triggerBadRequest = (req, res, next) => {
  const errorList = validationResult(req);

  if (!errorList.isEmpty()) {
    const errors = errorList.array().map((error) => ({ [error.param]: error.msg }));
    res.status(400).json({ message: "Error during post validation", errors });
  } else {
    next();
  }
};
