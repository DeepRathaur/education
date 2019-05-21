const { Schools,State, City  }   =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of School.');
    }else {
        let err, school;

        [err, school]   =   await to(Schools.create(body));

        if (err) ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new School.', school:school.toWeb()}, 201);
    }
}

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, schools;

    [err, schools]   =   await to(Schools.findAll({
        order:[['name','ASC']],
        include:[{model:State},{model:City}]
    }));

    if (err)    ReE(res, err, 422)

    let  school_json    =   []

    for(let i in schools)   {
        let details = schools[i];
        let info = details.toWeb();
        school_json.push(info);
    }
    return ReS(res, {schools: school_json});
}

module.exports.getAll   =   getAll;


const update    =   async function (req,res) {
    let err, school, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of school.');
    }else {

        [err, school] = await to(Schools.update(data, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of school is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated School : '+ data.name});
    }
}

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let school, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, school] = await to(Schools.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete school');

    return ReS(res, {message:'Deleted school'}, 204);

}
module.exports.remove = remove;