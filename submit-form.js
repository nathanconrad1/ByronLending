const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post("/submit-form", (req, res) => {
  // Get form data from request body
  const formData = req.body;

  // Create a transporter object using nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "isabelle.durgan@ethereal.email",
      pass: "9x12qSYMM6hpDm5tEQ",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: '"Utah Lending Form" <your-email@gmail.com>',
    to: "nathan.conrad2020@gmail.com",
    subject: "New Form Submission",
    text: `
            Name: ${formData.name}\n
            Email: ${formData.email}\n
            Location: ${formData.location}\n
            Collateral: ${formData.Collateral}\n
            Amount: ${formData.amount}\n
            Type: ${formData.type}\n
            Purchase: ${formData.purchase}\n
            Refinance: ${formData.refinance}\n
            Value: ${formData.value}\n
            Repairs: ${formData.repairs}\n
            Calculated Value: ${formData.calcValue}\n
            Occupied: ${formData.occupied}\n
            Rental: ${formData.rental}\n
            Use: ${formData.use}\n
            Message: ${formData.message}
        `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Form submitted successfully");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
