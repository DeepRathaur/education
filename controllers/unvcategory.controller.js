const { UnversityCategory  }   =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of University Category.');
    }else {
        let err, category;

        [err, category]   =   await to(UnversityCategory.create(body));

        if (err) ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new university categories.', unvcategory:category.toWeb()}, 201);
    }
}

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, category;

    [err, category]   =   await to(UnversityCategory.findAll({
        order:[['name','ASC']],
    }));

    if (err)    ReE(res, err, 422)

    let  category_json    =   []

    for(let i in category)   {
        let details = category[i];
        let info = details.toWeb();
        category_json.push(info);
    }
    
    return ReS(res, {UniversityCategories: category_json});
}

module.exports.getAll   =   getAll;


const update    =   async function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    let err, category, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of category.');
    }else {

        [err, category] = await to(UnversityCategory.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of category is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated Category : '+ data.name});
    }
}

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let category, err ;
    let id  =   req.params.id;
    data    =   req.body;
    [err, category] = await to(UnversityCategory.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete category');

    return ReS(res, {message:'Deleted Category'}, 204);

}
module.exports.remove = remove;