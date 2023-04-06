import { checkSchema } from "express-validator";
import PhoneNumber from "libphonenumber-js";

const contactSchema = checkSchema({
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
        const phoneNumber = PhoneNumber.parse(value, req.body.countryCode);
        if (!phoneNumber) {
          throw new Error("Invalid phone number");
        }
        req.body.phone = phoneNumber.formatInternational();
        return true;
      },
    },
  },
});

export const checkContactSchema = checkSchema(contactSchema);

export const triggerBadRequest = (req, res, next) => {
  const errorList = validationResult(req);

  if (!errorList.isEmpty()) {
    next(createHttpError(400, "Error during post validation", { errors: errorList.array() }));
    // next(createHttpError(400, "Error during post validation"));
  } else {
    next();
  }
};
