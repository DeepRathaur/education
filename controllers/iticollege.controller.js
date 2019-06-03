const { iticollege, iticollegetrade, ititrade }       =    require('../models');
const { to, ReE, ReS }  =    require('../services/util.service');
const excelToJson = require('convert-excel-to-json');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const create    =   async (req, res)    =>   {
    res.setHeader('Content-Type', 'application/json');
    let body    =   req.body;
    let err, colleges, collegestrades ;
    if (!body.name) {
        return ReE(res,'colleges name is mandatory.');
    } else {

        [err, colleges]    =   await to(iticollege.create(body));
        if (err)    return ReE(res, err, 422);


        if (body.trades.length > 0) {
            for (let i = 0; i < body.trades.length ; i++){
                let data    =   {college_id : colleges.id , trade_id:body.trades[i]};
                [err, collegestrades]    =   await to(iticollegetrade.create(data));
                if (err)    return ReE(res, err, 422);
            }
        }

        return ReS(res, {
            message: 'Successfully created new colleges.',
            colleges: colleges.toWeb()
        }, 201);
    }
};
module.exports.create   =   create;  

const getAll   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, collegess;
    [err, collegess]    =   await to(iticollege.findAll({
        order: [['name', 'ASC']],
        include: [
            { model: iticollegetrade, include :[{model: ititrade}] }
        ]
    }));
    if (err)    return ReE(res, err, 422);

    let colleges_json = [];
    for (let i in collegess) {
        let details =   collegess[i];
        let info    =   details.toWeb();
        colleges_json.push(info);
    }
    
    return ReS(res, {iticollege:colleges_json});
};
module.exports.getAll  =   getAll;

const update   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, collegess, data;
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'colleges code is mandatory.');
    }else {

        [err, collegess] = await to(iticollege.update(data, {
            where: {id:id}
        }));

        if(err) {
            if(err)   return ReE(res, err, 422);
        }
        return ReS(res,  {message:'Updated colleges'});
    }
};
module.exports.update  =   update;

const remove    =   async function (req, res) {
    let collegess, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, collegess] = await to(iticollege.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete colleges ');

    return ReS(res, {message:'Deleted colleges '}, 204);

};
module.exports.remove = remove;


const importcollege = async function (req, res) {
    let err, colleges;

    let storage = multer.diskStorage({
        destination: function (req, file, callback) {

            let dir1 = 'public/files/iticolleges';
            if (!fs.existsSync(dir1)) {
                fs.mkdirSync(dir1);
            }
            callback(null, dir1)
        },
        filename: function (req, file, callback) {
            let filename =  Date.now() + path.extname(file.originalname);
            callback(null, filename)
        }
    });

    let upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            let ext = path.extname(file.originalname).toLowerCase();
            if (ext !== '.xlsx') {
                ReE(res, 'Only xlsx files are allowed.');
            }
            callback(null, true)
        }
    }).single('file');

    upload(req, res, function (err) {

        if (err) {
            return ReE(res, 'Error on file uploading.');
        }
        let filedata = req.file;
        let filepath = filedata.path.replace(/^/, '');
        let result = excelToJson({
            sourceFile: filepath,
            columnToKey: {
                A: 'code',
                B: 'name',
                C: 'type',
                D: 'location',
                E: 'state_id',
                F: 'city_id',
                G: 'address',
                H: 'seats',
                I: 'website_url'
            },
            header: {
                rows: 1
            },
            sheets: ['Sheet1']
        });

        let data = result.Sheet1;
        let fileDataLength  =  data.length;

        iticollege.bulkCreate(data,{
                    updateOnDuplicate: [`code`,`name`],
                    //ignoreDuplicates: true,
                }).then(result => {
                    try {
                        return ReS(res, { message: 'Successfully imported excel file.'}, 201);
                    } catch (e) {
                        console.log(e);
                        ReE(res, 'Error on uploading data.');
                    }
                }, (err) => {
                    ReE(res, err, 422);
                });

    });
};
module.exports.importcollege = importcollege;