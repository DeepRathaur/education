const { User, referrals } = require('../models');
const { UserPreferedStates } = require('../models');
const { UsreSubject } = require('../models');
const { State } = require('../models');
const { Subject } = require('../models');
const validator = require('validator');
const { to, TE, ReE } = require('../services/util.service');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getUniqueKeyFromBody = function (body) {        // this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.email1;
    if (typeof unique_key === 'undefined') {
        if (typeof body.email2 != 'undefined') {
            unique_key = body.email2
        } else if (typeof body.mobile1 != 'undefined') {
            unique_key = body.mobile1
        } else if (typeof body.mobile2 != 'undefined') {
            unique_key = body.mobile2
        } else {
            unique_key = null;
        }
    }

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async (userInfo) => {
    let unique_key, auth_info, err;

    auth_info = {};
    auth_info.status = 'create';

    unique_key = getUniqueKeyFromBody(userInfo);

    if (!unique_key) TE('An email or mobile number was not entered.');

    if (validator.isEmail(unique_key)) {
        auth_info.method = 'email';
        userInfo.email1 = unique_key;

        if (!userInfo.referral_code) {
            //console.log(userInfo.referral_code);
            [err, user] = await to(User.create(userInfo));
            if (err) TE('user already exists with that email');
            if (user) {
                //Update Referral Code
                [err, referralcode] = await to(generateReferral(10));
                user.update({
                    referral_code: referralcode
                });
                //Insert Locations
                let locations;
                let states = userInfo.states;
                let statetext = userInfo.statetext;
                for (let i in states) {
                    let bodyLoc = { user_id: user.id, state_id: states[i], text: statetext[i] };
                    [err, locations] = await to(UserPreferedStates.create(bodyLoc));
                    if (err) return TE(err, 422);
                }

                //Insert Subjects
                let subjects;
                let subs = userInfo.subjects;
                let subtext = userInfo.subjecttext;

                for (let i in subs) {
                    let bodySub = { user_id: user.id, subject_id: subs[i], text: subtext[i] };

                    [err, subjects] = await to(UsreSubject.create(bodySub));

                    if (err) return TE(err, 422);
                }
            }
            return user;
        } else {
            let referralinf;
            [err, referral] = await to(checkReferralCodeisValid(userInfo.referral_code));
            if (err) TE('Referral Code is invalid');
            if (!referral) return TE('Referral Code is invalid.', 404);

            [err, user] = await to(User.create(userInfo));
            if (err) TE('user already exists with that email');
            if (user) {
                //Update Referral Code
                [err, referralcode] = await to(generateReferral(10));
                user.update({
                    referral_code: referralcode
                });

                //Insert Locations
                let locations;
                let states = userInfo.states;
                let statetext = userInfo.statetext;
                for (let i in states) {
                    let bodyLoc = { user_id: user.id, state_id: states[i], text: statetext[i] };
                    [err, locations] = await to(UserPreferedStates.create(bodyLoc));
                    if (err) return TE(err, 422);
                }

                //Insert Subjects
                let subjects;
                let subs = userInfo.subjects;
                let subtext = userInfo.subjecttext;

                for (let i in subs) {
                    let bodySub = { user_id: user.id, subject_id: subs[i], text: subtext[i] };

                    [err, subjects] = await to(UsreSubject.create(bodySub));

                    if (err) return TE(err, 422);
                }

                //Insert Referral Code 
                let referrer_id = referral.id;//user who is referring someone else
                let referred_id = user.id; // id of person being referred
                let bodyRef = { referrer_id: referrer_id, referred_id: referred_id };
                [err, referralinf] = await to(referrals.create(bodyRef));
                if (err) return TE(err, 422);

            }
            return user;
        }
    } else if (validator.isMobilePhone(unique_key, 'any')) {//checks if only phone number was sent
        auth_info.method = 'phone';
        userInfo.mobile1 = unique_key;

        [err, user] = await to(User.create(userInfo));
        if (err) TE('user already exists with that mobile number.');
        if (user) {
            let locations;
            let states = userInfo.states;
            for (let i in states) {
                let bodyLoc = { user_id: user.id, state_id: states[i] };
                [err, locations] = await to(UserPreferedStates.create(bodyLoc));

                if (err) return ReE(res, err, 422);
            }
        }
        return user;
    } else {
        TE('A valid email or mobile number was not entered.');
    }
}
module.exports.createUser = createUser;


const authUser = async function (userInfo) {          //returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);

    if (!unique_key) TE('Please enter an email or mobile number to login');


    if (!userInfo.password) TE('Please enter a password to login');

    let user;
    if (validator.isEmail(unique_key)) {
        auth_info.method = 'email';

        [err, user] = await to(User.findOne({
            attributes: ['id', 'name', 'uuid', 'password', 'lognum', 'is_active'],
            where: {
                [Op.or]: [{ email1: unique_key }, { email2: unique_key }, { email3: unique_key }]
            }
        }));
        if (err) TE(err.message);

    } else if (validator.isMobilePhone(unique_key, 'any')) {//checks if only phone number was sent
        auth_info.method = 'phone';

        [err, user] = await to(User.findOne({
            attributes: ['id', 'name', 'uuid', 'password', 'lognum'],
            where: {
                [Op.or]: [{ mobile1: unique_key }, { mobile2: unique_key }, { mobile3: unique_key }]
            }
        }));
        if (err) TE(err.message);

    } else {
        TE('A valid email or phone number was not entered');
    }

    if (!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if (err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;

const generateReferral = async (req, res) => {
    let length = req;
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var referral_code = '';
    for (var i = 0; i < length; i++) {
        referral_code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return referral_code;
}

const checkReferralCodeisValid = async (req, res) => {
    let err, refferral;
    [err, refferral] = await to(User.findOne({
        where: {
            referral_code: req
        }
    }));
    if (err) return TE(res, err, 422);
    return refferral;
}

const generateOTP = async (req, res) => {
    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < req; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
module.exports.generateOTP = generateOTP;

const __validOTP = async (req, res) => {
    let expired = req.getTime()/1000 + 86400;
    let currenttime = new Date();
    let time = currenttime.getTime()/1000;

    if (time < expired) {
        return true;
    }
    return false;
}
module.exports.__validOTP = __validOTP;
