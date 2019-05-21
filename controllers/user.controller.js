const { User } = require('../models');
const { Role } = require('../models');
const { Board } = require('../models');
const { Stream } = require('../models');
const { Class } = require('../models');
const { Course } = require('../models');
const { CastCategory } = require('../models');
const { UserPreferedStates } = require('../models');
const { UsreSubject, Religion, State, City } = require('../models');
const multer = require('multer');
const path = require('path');
const PRAMAS = require('../config/globalparam');

const authService = require('../services/auth.service');
const smsService = require('../services/sms.service');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    const body = req.body;
    if (!body.email1 || !body.email2 || !body.mobile1 || !body.mobile2) {
        return ReE(res, 'Please enter an email or mobile no to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;
        [err, user] = await to(authService.createUser(body));

        if (err) return ReE(res, err, 422);

        return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);
    }
}

module.exports.create = create;

const login = async function (req, res) {
    const body = req.body;
    //console.log(body);
    let err, user;
    [err, user] = await to(authService.authUser(req.body));
    //console.log(err);
    if (err) return ReE(res, err, 422);

    if (user) {
        if (user.is_active == true) {
            let lognum = user.lognum += 1;
            User.update({
                logdate: new Date(),
                lognum: lognum,
            }, {
                    where: {
                        id: user.id,
                    }
                });
        }
        return ReS(res, { token: user.getJWT(), user: user.toWeb() });
    }

}
module.exports.login = login;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, users;

    [err, users] = await to(User.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) ReE(res, err, 422)

    let user_json = []

    for (let i in users) {
        let details = users[i];
        let userinfo = details.toWeb();
        user_json.push(userinfo);
    }

    return ReS(res, { users: user_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, users;
    let id = req.params.id;

    [err, users] = await to(User.findAll({
        where: {
            id: id,
            is_active: 1
        },
        order: [['name', 'ASC']],
        include: [
            { model: Class }, { model: Religion }, { model: Board }, { model: Role }, { model: Stream }, { model: Course }, { model: CastCategory }, { model: UserPreferedStates }, { model: UsreSubject }, { model: State }, { model: City }
        ]
    }));

    if (err) ReE(res, err, 422)

    let user_json = []

    for (let i in users) {
        let details = users[i];
        let userinfo = details.toWeb();
        user_json.push(userinfo);
    }

    return ReS(res, { users: user_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        if (err.message == 'Validation error') err = 'The email address or mobile number is already in use';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated User: ' });
}
module.exports.update = update;

const remove = async function (req, res) {
    let user, err;
    let id = req.params.id;
    [err, user] = await to(User.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, { message: 'Deleted User' }, 204);

}
module.exports.remove = remove;

const profile = async function (req, res) {
    let err, user, users
    user = req.user;
    var id = user.id;

    [err, users] = await to(User.findAll({
        where: {
            id: id,
        },
        include: [
            { model: Class }, { model: Religion }, { model: Board }, { model: Role }, { model: Stream }, { model: Course }, { model: CastCategory }, { model: UserPreferedStates }, { model: UsreSubject }
        ]
    }));

    if (err) return ReE(res, err, 422);

    let user_json = []

    for (let i in users) {
        let details = users[i];

        if (details.profile_picture != null) {
            let profilePic = details.profile_picture.replace('/public', '');
            let profileUrl = PRAMAS.baseurl + profilePic;
            details.profile_picture = profileUrl;
        }
        let userinfo = details.toWeb();
        user_json.push(userinfo);
    }
    return ReS(res, { user: user_json });
};

module.exports.profile = profile;

const profilepicture = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, profilepicture;
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, '../public/images')
        },
        filename: function (req, file, callback) {
            let userid = req.body.user_id;
            let filename = userid + '-' + Date.now() + path.extname(file.originalname);
            callback(null, filename)
        }
    });

    let upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            let ext = path.extname(file.originalname).toLowerCase();

            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif') {
                ReE(res, 'Only images are allowed.');
            }
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                ReE(res, 'Only jpg,png,gif images are allowed.');
            }
            callback(null, true)
        }
    }).single('image');

    upload(req, res, function (err) {

        if (err) {
            return ReE(res, 'Error on file uploading.');
        }
        let userId = req.body.user_id;
        var filedata = req.file;
        User.update(
            { profile_picture: filedata.path.replace(/^../, '') },
            {
                where: {
                    id: userId
                }
            }).then(result => {
                return ReS(res, { message: 'Profile picture updated successfully.' }, 200);
            }).catch(err => {
                console.log(err);
                return ReE(res, 'Error on file uploading.');
            });
    });

}
module.exports.profilepicture = profilepicture;


const sendOtp = async (req, res) => {
    let err, users, otp, sms, data;
    let body = req.body;
    [err, users] = await to(User.findOne({
        where: {
            id: body.userid,
        }
    }));

    if (err) return ReE(res, err, 422);

    [err, otp] = await to(authService.generateOTP(6));

    if (err) return ReE(res, err, 422);

    User.update({
        otp_created_at: new Date(),
        otp: otp,
    }, {
            where: {
                id: users.id,
            }
        });

    data    =   {mobile:users.mobile1,otp:otp} ;
       
    [err, sms] = await to(smsService.sendsms(data));  

    if(sms) {
        return ReS(res, { message: 'OTP send successfully.', sms:sms });
    } else {
        return ReS(res, { message: 'OTP send successfully.', otp:otp, mobile:users.mobile1 });
    }
}
module.exports.sendOtp = sendOtp;

const verifyotp = async (req, res) => {
    let err, users;
    let body = req.body;
    [err, users] = await to(User.findOne({
        where: {
            id: body.userid,
            otp: body.otp
        }
    }));

    if (err) return ReE(res, err, 422);

    if (users) {
        [err, checkotp] = await to(authService.__validOTP(users.otp_created_at));
        if (err) return ReE(res, err, 422);

        if (checkotp) {
            User.update({
                otp_created_at: null,
                otp: null,
                otp_verified: 1,
                is_active:1
            }, {
                    where: {
                        id: users.id,
                    }
                });
            return ReS(res, { message: 'Verify successfully.' });
        } else {
            return ReE(res, { message: 'The OTP request has either expired or is invalid.' });
        }

    } else {
        return ReE(res, { message: 'The OTP request has either expired or is invalid.' });
    }
}
module.exports.verifyotp = verifyotp;