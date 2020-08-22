const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendUserMessage = functions.firestore
    .document('emails/{doc_id}')
    .onCreate((snap, context) => {
        let name = snap.data().name;
        let email = snap.data().email;
        let number = snap.data().number;
        let message = snap.data().message;

        /* ... */
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'verynicesalonbooker@gmail.com',
                pass: '1sdfgtre'
            }
        });

        let mailOptions = {
            from: 'verynicesalonbooker@gmail.com',
            to: 'tanxyrogue@gmail.com',
            subject: `${name} has left you a message on craig-tanaka.webb.app`,
            html:   `<h3>The Message</h3>
                    ${message}<hr><br>
                    
                    <h3>User's Details</h3>
                    <b>Name :</b> ${name}<br>
                    <b>Email :</b> ${email}<br>
                    <b>Phone :</b> ${number}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return "Ok"
});
