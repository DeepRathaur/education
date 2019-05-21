const { Coursefor }   =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of course for.');
    }else {
        let err, coursefor;

        [err, coursefor]   =   await to(Coursefor.create(body));

        if (err) ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new course.', course:coursefor.toWeb()}, 201);
    }
}

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, coursefor;

    [err, coursefor]   =   await to(Coursefor.findAll({
        order:[['name','ASC']]
    }));

    if (err)    ReE(res, err, 422)

    let  course_json    =   []

    for(let i in coursefor)   {
        let coursedetails = coursefor[i];
        let course_info = coursedetails.toWeb();
        course_json.push(course_info);
    }
    return ReS(res, {coursefor: course_json});
}

module.exports.getAll   =   getAll;


const update    =   async function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    let err, coursefor, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of coursefor.');
    }else {
        
        [err, coursefor] = await to(Coursefor.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of coursefor is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated coursefor : '+ data.name});
    }
}

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let coursefor, err,data ;
    let id = req.params.id;
    data    =   req.body;
    [err, coursefor] = await to(Coursefor.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete coursefor');

    return ReS(res, {message:'Deleted coursefor'}, 204);

}
module.exports.remove = remove;