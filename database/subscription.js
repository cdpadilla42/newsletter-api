var mongoose = require('mongoose');

var SubSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    frequency: {
        type: String,
        enum: ['ALL', 'SOME', 'UNSUBSCRIBED'],
        default: 'ALL',
    }
});

module.exports = mongoose.model('Subscription', SubSchema);