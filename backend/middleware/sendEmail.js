const nodemailer = require("nodemailer");
module.exports.sendEmail = async(options)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "divyeshbarvadiya6@gmail.com",
            pass: "xdepfeppfrdkbbts",
        },
        service : "gmail"
    });

    const mailOptions = {
        from :  "divyeshbarvadiya6@gmail.com",
        to : options.email,
        subject : options.subject,
        text : options.message

    }
    await transporter.sendMail(mailOptions);
}