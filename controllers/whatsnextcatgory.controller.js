const { whatsnextcategory }     =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if (!body.name) {
        return ReE(res, 'Please enter a name of whatsnextcategory.');
    } else {
        let err, whatsnextcategorys;

        [err, whatsnextcategorys] = await to(whatsnextcategory.create(body));

        if (err) return ReE(res, err, 422);
        return ReS(res, {message: 'Successfully created new whatsnextcategory.', whatsnextcategory: whatsnextcategorys.toWeb()}, 201);
    }
};

module.exports.create   =   create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, whatsnextcategorys;

    [err, whatsnextcategorys] = await to(whatsnextcategory.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let whatsnextcategory_json = []

    for (let i in whatsnextcategorys) {
        let whatsnextcategorysdetails = whatsnextcategorys[i];
        let whatsnextcategory_info = whatsnextcategorysdetails.toWeb();
        whatsnextcategory_json.push(whatsnextcategory_info);
    }
    return ReS(res, {whatsnextcategorys: whatsnextcategory_json});
};

module.exports.getAll   =   getAll;

const update    =   async function (req, res) {
    let err, whatsnextcategory, data
    let whatsnextcategory_id = req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of whatsnextcategory.');
    }else {

        [err, whatsnextcategory] = await to(whatsnextcategory.update({
            name: data.name,
        }, {
            where: {id:whatsnextcategory_id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of whatsnextcategory is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated whatsnextcategory : '+ data.name});
    }
};

module.exports.update      =    update  ;


const remove    =   async function (req, res) {
    let whatsnextcategory, err ;
    let whatsnextcategory_id = req.params.id;

    [err, whatsnextcategory] = await to(whatsnextcategory.destroy({
        where: {id:whatsnextcategory_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete whatsnextcategory');

    return ReS(res, {message:'Deleted Bord'}, 204);

};
module.exports.remove = remove;