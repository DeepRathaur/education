const { University,UnversityCategory, State,City}      =   require('../models');
const { to, ReE, ReS }    =   require('../services/util.service');

const create    =   async (req, res)     => {
    res.setHeader('Content-Type', 'application/json');
    let err, university;
    let body = req.body;

    if (!body){
        return ReE(res, 'Body is empty');
    }else {
        [err, university]   =   await to (University.create(body));

        if (err)   return ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new University.', university: university.toWeb()}, 201);
    }
};

module.exports.create   =   create;

const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, universities;

    [err, universities]     =   await to (University.findAll({
        order:[['title','ASC']],
        include :[{model:UnversityCategory} , {model:State}, {model:City}]
    }));
    //console.log(err);
    if (err)    return ReE(res, err, 422);

    let university_json = [];
    for (let i in universities) {
        let details =   universities[i];
        let info    =   details.toWeb();
        university_json.push(info);
    }
    return ReS(res, {universities:university_json});
}
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, university, data;
    let university_id = req.params.id;
    data = req.body;
    [err, university] = await to(University.update(data, {
        where: {id: university_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of university is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated University : '});
}

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let university, err ;
    let university_id = req.params.id;
    data    =   req.body;
    [err, university] = await to(University.destroy({
        where: {id:university_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete university');

    return ReS(res, {message:'Deleted University'}, 204);
}

module.exports.remove   =   remove;