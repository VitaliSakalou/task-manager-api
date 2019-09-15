const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "vitali.sakalou@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcometo the app, ${name}. Let me know how you get along with the app`
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "vitali.sakalou@gmail.com",
    subject: "Have a good one!",
    html: `<p>Good buy, <h1>${name}</h1></p>`
  });
};

module.exports = {
  sendWelcomEmail,
  sendCancelationEmail
};
