const { CourseCategory  }   =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');


const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of Course Category.');
    }else {
        let err, coursescategory;

        [err, coursescategory]   =   await to(CourseCategory.create(body));

        if (err) ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new course category.', coursecategory:coursescategory.toWeb()}, 201);
    }
}

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, coursescategory;

    [err, coursescategory]   =   await to(CourseCategory.findAll({
        order:[['name','ASC']],
    }));

    if (err)    ReE(res, err, 422)

    let  coursescategory_json    =   []

    for(let i in coursescategory)   {
        let coursedetails = coursescategory[i];
        let course_info = coursedetails.toWeb();
        coursescategory_json.push(course_info);
    }
    return ReS(res, {coursecategory: coursescategory_json});
}

module.exports.getAll   =   getAll;


const update    =   async function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    let err, coursescategory, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of courses category.');
    }else {

        [err, coursescategory] = await to(CourseCategory.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of Course Category is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated Course Category : '+ data.name});
    }
}

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let coursecategory, err,data ;
    let id = req.params.id;
    data    =   req.body;
    [err, coursecategory] = await to(CourseCategory.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete course category');

    return ReS(res, {message:'Deleted Course Category'}, 204);

}
module.exports.remove = remove;