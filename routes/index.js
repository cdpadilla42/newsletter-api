var express = require('express');
var mailer = require('../mailer/index');
var subscription = require('../database/subscription');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.post('/api/subsribe', function (req, res) {
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    var sub = new subscription({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });

    sub.save().then(function (err, model) {
        if (err) {
            console.log(err);
            return res.json(err);
        }

        console.log('New subscription { ' + user.firstName + " " + user.lastName + ':' + user.email + ' } has been saved successfully!');
    });

    mailer.send(user, function (err, result) {
        if(err) {
            console.log(err);
            return res.json(err);
        }

        return res.json(result);
    });
});

router.post('/api/updatesub', function (req, res) {
    const id = req.body.id
    if (id && req.body.frequency) {
        return updateSubscription(id, req.body.frequency, res);
    } else {
        return res.json({message: "No matching ID"});
    }
});

function updateSubscription(id, frequency, res) {
    const update = {
        frequency: frequency,
    }
    var ObjectId = require('mongoose').Types.ObjectId; 
    console.log("updating....")
    subscription.findByIdAndUpdate(
        new ObjectId(id),
        update,
    ).then(function (err, result) {
        if(err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    })
}

router.post('/api/send', function (req, res) {
    const {html, subject} = req.body;

    if (html && subject) {  
        mailer.send(user, function (err, result) {
            if(err) {
                console.log(err);
                return res.json(err);
            }
    
            return res.json(result);
        });
    } else {
        return res.json({message: "Missing props"});
    }
    
   
    
});

module.exports = router;