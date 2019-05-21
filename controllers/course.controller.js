const { Course,  CourseCategory, Coursefor}   =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of course.');
    }else {
        let err, courses;

        [err, courses]   =   await to(Course.create(body));

        if (err) ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new course.', course:courses.toWeb()}, 201);
    }
}

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, courses;

    [err, courses]   =   await to(Course.findAll({
        order:[['name','ASC']],
        include: [
            { model: CourseCategory }, {model: Coursefor}
        ]
    }));

    if (err)    ReE(res, err, 422)

    let  course_json    =   []

    for(let i in courses)   {
        let coursedetails = courses[i];
        let course_info = coursedetails.toWeb();
        course_json.push(course_info);
    }
    return ReS(res, {courses: course_json});
}

module.exports.getAll   =   getAll;

/*Get courses by course category*/
const getOne    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, courses;
    let caoursecatid       =    req.params.id;
    [err, courses]   =   await to(Course.findAll({
        order:[['name','ASC']],
        include: [
            { model: CourseCategory, where:{id:caoursecatid} }, {model: Coursefor}
        ]

    }));

    if (err)    ReE(res, err, 422)

    let  course_json    =   []

    for(let i in courses)   {
        let coursedetails = courses[i];
        let course_info = coursedetails.toWeb();
        course_json.push(course_info);
    }
    return ReS(res, {courses: course_json});
}

module.exports.getOne   =   getOne;

/*Get courses by course academic level*/

const getCourseByAL    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, courses;
    let caourforid       =    req.params.id;
    [err, courses]   =   await to(Course.findAll({
        order:[['name','ASC']],
        include: [
            { model: CourseCategory}, {model: Coursefor, where:{id:caourforid} }
        ]

    }));

    if (err)    ReE(res, err, 422)

    let  course_json    =   []

    for(let i in courses)   {
        let coursedetails = courses[i];
        let course_info = coursedetails.toWeb();
        course_json.push(course_info);
    }
    return ReS(res, {courses: course_json});
}

module.exports.getCourseByAL   =   getCourseByAL;

const update    =   async function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    let err, course, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of course.');
    }else {
        
        [err, course] = await to(Course.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of course is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated Course : '+ data.name});
    }
}

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let course, err,data ;
    let id = req.params.id;
    data    =   req.body;
    [err, course] = await to(Course.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete course');

    return ReS(res, {message:'Deleted Course'}, 204);

}
module.exports.remove = remove;