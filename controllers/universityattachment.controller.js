const {UnvAttachment, Campus, University} = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PARAMS            = require('../config/globalparam');
const {to, ReE, ReS} = require('../services/util.service');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const dir = './public/universityAttachment';
            if (fs.existsSync(dir)) {
                callback(null,dir);
            } else {
                fs.mkdir(dir, function (err) {
                    if (err) {
                      callback(null,err);
                    }
                })
            }
        },
        filename: function (req, file, callback) {
            let filename = req.body.type;
            callback(null, filename + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    let upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            let ext = path.extname(file.originalname).toLowerCase()
            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/gif' && file.mimetype  !== 'application/pdf') {
                ReE(res, 'Only jpg,png,gif,pdf file are allowed.');
            }
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf') {
                ReE(res, 'Only jpg,png,gif file are allowed.');
            }
            callback(null, true)
        }
    }).single('attachment');

    upload(req, res, function (err) {
        if (err) return ReE(res, 'Error on file uploading.');
        let attachment_info =   req.body;
        let universityId = parseInt(attachment_info.university_id);
        let campusId = parseInt(attachment_info.campus_id);
        if (!universityId) {
            return ReE(res, 'University is mandatory.');
        } else if (!campusId) {
            return ReE(res, 'campus is mandatory.');
        } else {
            let fileData    =   req.file;
            let imagePath   =   fileData.path.replace(/^/, '');
            let body = { university_id: attachment_info.university_id, campus_id: attachment_info.campus_id, name: attachment_info.name,type: attachment_info.type, attachment_uri: imagePath, extra:attachment_info.extra };

            UnvAttachment.create(body).then(universityattachment => {
                try {
                    let attachment_json = universityattachment.toWeb();
                    return ReS(res, {attachment_json}, 201);
                } catch (e) {
                    console.log(e);
                    ReE(res, 'Error on file uploading.');
                }
            }, (err) => {
                ReE(res, err, 422);
            });
        }
    });
};
module.exports.create = create;

const get = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, universityattachment;

    [err, universityattachment] = await to(UnvAttachment.findAll({
        include: [{model: University}, {model: Campus}]
    }));

    if (err) return ReE(res, err, 422);

    let unvhowtoapp_json = [];
    for (let i in universityattachment) {
        var university = universityattachment[i].University.name;
        var campus = universityattachment[i].Campus.name;
        var name = universityattachment[i].name;
        var type = universityattachment[i].type;
        var extra = universityattachment[i].extra;
        var status = universityattachment[i].status;
        var attachment_uri = PARAMS.baseurl + universityattachment[i].attachment_uri.replace(/\\/g, "/").replace("public", "");
        let details = { 'id':universityattachment[i].id,'university': university,'campus': campus,'name': name,'type': type, 'extra': extra, 'status': status,
            'attachment_uri': attachment_uri };

        let info = details;
        unvhowtoapp_json.push(info);
    }
    return ReS(res, {universityattachment: unvhowtoapp_json});
};

module.exports.get = get;


const getOne = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.campusid);
    let err, universityattachment;

    [err, universityattachment] = await to(UnvAttachment.findAll({
        where: {
            campus_id: id
        },
        include: [{model: University}, {model: Campus}]
    }));

    if (err) return ReE(res, err, 422);

    let unvhowtoapp_json = [];
    for (let i in universityattachment) {
        var university = universityattachment[i].University.name;
        var campus = universityattachment[i].Campus.name;
        var name = universityattachment[i].name;
        var type = universityattachment[i].type;
        var extra = universityattachment[i].extra;
        var status = universityattachment[i].status;
        var attachment_uri = PARAMS.baseurl + universityattachment[i].attachment_uri.replace(/\\/g, "/").replace("public", "");
        let details = { 'id':universityattachment[i].id,'university': university,'campus': campus,'name': name,'type': type, 'extra': extra, 'status': status,
            'attachment_uri': attachment_uri };

        let info = details;
        unvhowtoapp_json.push(info);
    }
    return ReS(res, {universityattachment: unvhowtoapp_json});
};

module.exports.getOne = getOne;
