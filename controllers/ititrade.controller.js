const { ititrade }       =    require('../models');
const { to, ReE, ReS }  =    require('../services/util.service');
const excelToJson = require('convert-excel-to-json');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const create    =   async (req, res)    =>   {
    res.setHeader('Content-Type', 'application/json');
    let body    =   req.body;
    let err, trades ;
    if (!body.name) {
        return ReE(res,'trades name is mandatory.');
    } else {
        [err, trades]    =   await to(ititrade.create(body));
        if (err)    return ReE(res, err, 422);

        return ReS(res, {
            message: 'Successfully created new trades.',
            trades: trades.toWeb()
        }, 201);
    }
};
module.exports.create   =   create;  

const getAll   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, tradess;
    [err, tradess]    =   await to(ititrade.findAll());
    if (err)    return ReE(res, err, 422);

    let trades_json = [];
    for (let i in tradess) {
        let details =   tradess[i];
        let info    =   details.toWeb();
        trades_json.push(info);
    }
    
    return ReS(res, {ititrade:trades_json});
};
module.exports.getAll  =   getAll;

const update   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, tradess, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.description) {
        return ReE(res, 'trades Us description is mandatory.');
    }else {

        [err, tradess] = await to(ititrade.update(data, {
            where: {id:id}
        }));

        if(err) {
            if(err)   return ReE(res, err, 422);
        }
        return ReS(res,  {message:'Updated trades Us'});
    }
};
module.exports.update  =   update;

const remove    =   async function (req, res) {
    let tradess, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, tradess] = await to(ititrade.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete trades us');

    return ReS(res, {message:'Deleted trades US'}, 204);

};
module.exports.remove = remove;

const importtrade = async function (req, res) {
    let err, colleges;

    let storage = multer.diskStorage({
        destination: function (req, file, callback) {

            let dir1 = 'public/files/ititrade';
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
            },
            header: {
                rows: 1
            },
            sheets: ['Sheet1']
        });

        let data = result.Sheet1;
        let fileDataLength  =  data.length;

        ititrade.bulkCreate(data,{
            updateOnDuplicate: [`name`],
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
module.exports.importtrade = importtrade;