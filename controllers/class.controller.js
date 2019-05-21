const { Class  }   =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of class.');
    }else {
        let err, classes;

        [err, classes]   =   await to(Class.create(body));

        if (err) {
            ReE(res, err, 422);
        } else   {
            return ReS(res, {message: 'Successfully created new class.', class:classes.toWeb()}, 201);
        }
    }
}

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, classes;

    [err, classes]   =   await to(Class.findAll({
        order:[['name','ASC']],
    }));

    if (err)    ReE(res, err, 422)

    let  class_json    =   []

    for(let i in classes)   {
        let details = classes[i];
        let class_info = details.toWeb();
        class_json.push(class_info);
    }
    return ReS(res, {class: class_json});
}

module.exports.getAll   =   getAll;


const update    =   async function (req,res) {
    let err, classes, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of course.');
    }else {

        [err, classes] = await to(Class.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of class is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated Class : '+ data.name});
    }
}

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let classes, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, classes] = await to(Class.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete class');

    return ReS(res, {message:'Deleted Class'}, 204);

}
module.exports.remove = remove;