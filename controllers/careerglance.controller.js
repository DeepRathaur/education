const {careerglance} = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PARAMS = require('../config/globalparam');
const {to, ReE, ReS} = require('../services/util.service');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let storage = multer.diskStorage({
        destination: (req, file, callback) => {
            const dir = './public/careerglance';
            if (fs.existsSync(dir)) {
                callback(null, dir);
            } else {
                fs.mkdir(dir, function (err) {
                    if (err) {
                        callback(null, err);
                    }
                })
            }
        },
        filename: function (req, file, callback) {
            callback(null, Date.now() + path.extname(file.originalname));
        }
    });

    let upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            let ext = path.extname(file.originalname).toLowerCase()
            if (ext !== '.pdf' && ext !== '.docx' && ext !== '.doc') {
                ReE(res, 'Only .pdf, .docx, .doc file are allowed.');
            }
            callback(null, true)
        }
    }).single('file');

    upload(req, res, function (err) {
        if (err) return ReE(res, 'Error on file uploading.');
        let fileData = req.file;
        let imagePath = fileData.path.replace(/^/, '');
        let body = {
            title: req.body.title,
            filepath: imagePath
        };

        careerglance.create(body).then(result => {
            try {
                let attachment_json = result.toWeb();
                return ReS(res, {attachment_json}, 201);
            } catch (e) {
                console.log(e);
                ReE(res, 'Error on file uploading.');
            }
        }, (err) => {
            ReE(res, err, 422);
        });

    });
};
module.exports.create = create;

const getAll = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, attachment;

    [err, attachment] = await to(careerglance.findAll({
    }));

    if (err) return ReE(res, err, 422);

    let d_json = [];
    for (let i in attachment) {
        let details = attachment[i];
        let filepath = PARAMS.baseurl + details.filepath.replace(/\\/g, "/").replace("public", "");
        let info = details.toWeb();
        info.filepath = filepath ;
        d_json.push(info);
    }
    return ReS(res, {attachment: d_json});
};

module.exports.getAll = getAll;


const remove    =   async function (req, res) {
    let attach, err ;
    let id = req.params.id;
    [err, attach] = await to(careerglance.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete attach');

    return ReS(res, {message:'Deleted attach'}, 204);

};
module.exports.remove = remove;