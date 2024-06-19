var template = require('lodash.template');
var fs = require('fs');
var path = require('path');
var config = require('../config.json');
var nodemailer = require('nodemailer');
// var subscription = require('../database/subscription');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.template.from_email,
      pass: config.email.template.gmail_pw,
    }
  });
  

var mailer = {};

mailer.send = function (user, cb) {
    var message = {
        "html": template(fs.readFileSync(path.join(__dirname, '..', 'templates', 'test-template')))({
            firstName: user.firstName,
            email: user.email}),
        "subject": config.email.template.subject,
        "from": {
            address: config.email.template.from_email,
            name: config.email.template.from_name,
        },
        "to": [{
            "address": user.email,
            "name": user.firstName + " " + user.lastName,
            "type": "to"
        }]
    };

    transporter.sendMail(message, function(error, info){
        if (error) {
            cb(error);
        } else {
            cb(null, info.response)
            console.log('Email sent: ' + info.response);
        }
      });
};

// mailer.sendNewsletter = function ({html, subject}) {
//     const subscriptions = subscription.find({frequency: 'ALL'});

//     var message = {
//         "html": html,
//         "subject": subject,
//         "from": {
//             address: config.email.template.from_email,
//             name: config.email.template.from_name,
//         },
      
//     };

//     const formattedMessages = subscriptions.map(sub => {
//         const userMessage = 
//     })
   

//     transporter.sendMail(message, function(error, info){
//         if (error) {
//             cb(error);
//         } else {
//             cb(null, info.response)
//             console.log('Email sent: ' + info.response);
//         }
//       });
// };

module.exports = mailer;
