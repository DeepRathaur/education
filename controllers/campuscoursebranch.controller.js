const {UniversityCampusCourseBranch,  Course, Branch} = require('../models');
const {to, ReE, ReS} = require('../services/util.service');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;
    let courseId = (body.course_id);
    let branchIds = (body.branch_id);
    let err, universityCampuscourseBranch, courese;

    [err, courese] = await to(checkCourse(courseId));
    if (err) return ReE(res, err, 422);
    if (!courese) return ReE(res, 'Course not found on given input.', 404);


    let data = [];
    for (let value of branchIds) {
        let bodyP = {universitycampuscourse_id: body.universitycampuscourse_id, course_id: courseId, branch_id: value};
        [err, isunique] = await to(isIdUnique(bodyP));

        if (err) return ReE(res, err, 422);

        if (isunique > 0) {
            return ReE(res, {message: 'Please select unique branch!'}, 422);
        } else {
            data.push(bodyP);
        }
    }

        [err, universityCampuscourseBranch] = await to(UniversityCampusCourseBranch.bulkCreate(data));
        console.log(err);
        if (err) return ReE(res, err, 422);

        /* universityCampuscourse.addBranch(branch);         //Add branch id in association table campus course

        [err, universityCampuscourse] = await to(universityCampuscourse.save());

        if (err) return ReE(res, err, 422); */

        return ReS(res, {
            message: 'Successfully created new University Campus Course Branch.'
        }, 201);
};

module.exports.create = create;

const checkCourse = async (req, res) => {
    let err, courses;
    [err, courses] = await to(Course.findOne({
        where: {
            id: req
        }
    }));

    if (err) return ReE(res, err, 422);
    return courses;
};

const isIdUnique = async (req, res) => {
    let err, campcoursebranch;
    [err, campcoursebranch] = await to(UniversityCampusCourseBranch.findAndCountAll({
        where: {
            universitycampuscourse_id: req.universitycampuscourse_id,
            branch_id: req.branch_id,
            course_id: req.course_id
        }
    }));

    if (err) return ReE(res, err, 422);
    return campcoursebranch.count;
};

const get       =       async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, campuscoursesbranch;

    [err, campuscoursesbranch]    =   await to (UniversityCampusCourseBranch.findAll({

    }));

    if (err)    return ReE(res, err, 422);

    let unvcamcourse_json = [];
    for (let i in campuscoursesbranch) {
        let details     =    campuscoursesbranch[i];
        let info        =    details.toWeb();
        unvcamcourse_json.push(info);
    }
    return ReS(res, {universitycampuscoursebranch: unvcamcourse_json})
};

module.exports.get  =   get;

//CampusId and course Id Wise branch
const getOne       =       async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, campuscoursebranches;
    let id = parseInt(req.params.campusid);
    let courseid = parseInt(req.params.courseid);

    [err, campuscoursebranches]    =   await to (UniversityCampusCourseBranch.findAll({
        where : {
            universitycampuscourse_id : id,
            course_id : courseid,
        },
        include:[{model:Branch,attributes:['name']}]
    }));

    if (err)    return ReE(res, err, 422);

    let unvcamcourse_json = [];
    for (let i in campuscoursebranches) {
        let details     =    campuscoursebranches[i];
        let info        =    details.toWeb();
        unvcamcourse_json.push(info);
    }
    return ReS(res, {universitycampuscoursebranch: unvcamcourse_json})
};

module.exports.getOne  =   getOne;

const  remove   =   async  (req,res)   => {
    res.setHeader('Content-Type', 'application/json');
    let campuscourses, err,data ;
    let id = req.params.id;
    data    =   req.body;
    [err, campuscourses] = await to(UniversityCampusCourseBranch.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete University Campus Course Branch');

    return ReS(res, {message:'Deleted  University University Campus Course Branch'}, 204);
};
module.exports.remove   =   remove;