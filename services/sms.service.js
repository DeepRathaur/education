const   twilio = require('twilio');

let accountSid = 'AC5e3d6dc76037e13564e9cdd90bf976df'; // Your Account SID from www.twilio.com/console
let authToken = '4410ee5519d4757887fb7755230cd063';   // Your Auth Token from www.twilio.com/console

let client = new twilio(accountSid, authToken);

/* client.messages.create({
    body: 'Hello from Deepak',
    to: '+918178721573',  // Text this number
    from: '+18506953726' // From a valid Twilio number
})
.then((message) => console.log(message.sid)).done(); */

//console.log(message.sid);

const sendsms = async (req, res) => {
    client.messages.create({
        body: 'This is your one-time password - '+ req.otp +' Thank you!',
        to: '+91'+req.mobile,  // Text this number
        from: '+18506953726'// From a valid Twilio number
    })
    .then((message) => console.log(message.sid)).done();
    return message.sid;
}
module.exports.sendsms = sendsms;