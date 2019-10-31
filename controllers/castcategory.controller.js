const { CastCategory }        =   require('../models');
const { to, ReE, ReS }        =   require('../services/util.service');

const create    =   async function (req, res) {

    res.setHeader('Content-Type','application/json');
    const body  =   req.body;
    if(!body.name)  {
        return ReE(res, 'Please enter a name of caste category.');
    } else {
        let err, castecategory;

        [err, castecategory]    =   await to(CastCategory.create(body));

        if (err)    ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new caste category.', castecategory:castecategory.toWeb()}, 201);
    }
}

module.exports.create   =   create;


const getAll    =   async function (req, res) {
    res.setHeader('Content-Type','application/json');

    let err, castecategories;

    [err, castecategories]  =   await to(CastCategory.findAll({
        order:[['name','ASC']],
    }));

    if (err)    ReE(res, err, 422)

    let  cast_json    =   []

    for(let i in castecategories)   {
        let details = castecategories[i];
        let caste_info = details.toWeb();
        cast_json.push(caste_info);
    }
    return ReS(res, {castecategories: cast_json});
}

module.exports.getAll   =   getAll;

const update    =   async function (req, res) {
    let err, castcategory, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of castcategory.');
    }else {

        [err, castcategory] = await to(CastCategory.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of castcategory is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated Cast Category : '+ data.name});
    }
}

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let castcategory, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, castcategory] = await to(CastCategory.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete cast category');

    return ReS(res, {message:'Deleted Caste Category'}, 204);

}
module.exports.remove = remove;