import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SEND_GRID_KEY);

const sendContactInfoMail = async (firstName, lastName, email, phone, message) => {
  console.log("ENV - key: ", process.env.SEND_GRID_KEY);
  console.log("ENV - sender: ", process.env.SENDER_EMAIL);
  console.log("ENV - reveiver: ", process.env.RECIPIENT_EMAIL);

  const recipientAddress = process.env.RECIPIENT_EMAIL;
  const msg = {
    to: recipientAddress,
    from: process.env.SENDER_EMAIL,
    subject: "🚀☄️🔥 POSSIBLE DEV OPPORTUNITY 🕊️😎🧯",
    text: `Nic, you have a new mail from Nix-view`,
    html: `
         <p>Hi Nic,</p>
         <p><strong>${firstName} ${lastName}</strong> contacted you on Nix-view.</p>
         <ul>
            <li>First name: <strong>${firstName}</strong></li>
            <li>Last name: <strong>${lastName}</strong></li>
            <li>Email: <strong>${email}</strong></li>
            <li>Phone no.: <strong>${phone}</strong></li>
            <li>Message: <strong>${message}</strong></li>
         </ul>
         
         <p><strong>With Love,</strong></p>
         <p>NixView</p>
       `,
  };
  await sgMail.send(msg);
};

export default sendContactInfoMail;
