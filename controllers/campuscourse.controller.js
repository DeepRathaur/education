const {UniversityCampusCourse, Campus, University, Course} = require('../models');
const {to, ReE, ReS} = require('../services/util.service');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;
    let universityId = parseInt(body.university_id);
    let campusId = parseInt(body.campus_id);
    let courseId = (body.course_id);

    if (!universityId) {
        return ReE(res, 'University is mandatory.');
    } else if (!campusId) {
        return ReE(res, 'campus is mandatory.');
    } else {
        let err, universityCampuscourse, campus, university, courese;
        //let branch = body.branch_id;
        [err, university] = await to(checkUniversity(universityId));
        if (err) return ReE(res, err, 422);
        if (!university) return ReE(res, 'University not found on given input.', 404);

        [err, campus] = await to(checkCampus(campusId));
        if (err) return ReE(res, err, 422);
        if (!campus) return ReE(res, 'Campus not found on given input.', 404);
        if (campus.university_id != universityId) return ReE(res, 'Campus not found on selected university.', 404);

        /* [err, courese] = await to(checkCourse(courseId));
        if (err) return ReE(res, err, 422);
        if (!courese) return ReE(res, 'Course not found on given input.', 404); */


        let data=[];
        for (let value of courseId) {
            let body    =   {university_id:universityId,campus_id:campusId,course_id:value };

            [err, isunique] = await to(isIdUnique(body));
            
            if (err) return ReE(res, err, 422);

            if (isunique > 0) {
                return ReE(res, {message:'Please select unique course!'}, 422);
            } else {
                data.push(body);
            }
        }
        
        [err, universityCampuscourse] = await to(UniversityCampusCourse.bulkCreate(data));

        if (err) return ReE(res, err, 422);

        /* universityCampuscourse.addBranch(branch);         //Add branch id in association table campus course

        [err, universityCampuscourse] = await to(universityCampuscourse.save());

        if (err) return ReE(res, err, 422); */

        return ReS(res, {
            message: 'Successfully created new University Campus Course.'
        }, 201);
    }
}

module.exports.create = create;


const checkCampus = async (req, res) => {
    let err, campus;
    [err, campus] = await to(Campus.findOne({
        where: {
            id: req
        }
    }));
    if (err) return ReE(res, err, 422);
    return campus;
};

const checkUniversity = async (req, res) => {
    let err, university;
    [err, university] = await to(University.findOne({
        where: {
            id: req
        }
    }));

    if (err) return ReE(res, err, 422);
    return university;
};

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
    let err, campcourse;
    [err, campcourse] = await to(UniversityCampusCourse.findAndCountAll({
        where: {
            university_id: req.university_id,
            campus_id: req.campus_id,
            course_id: req.course_id
        }
    }));

    if (err) return ReE(res, err, 422);
    return campcourse.count;
};

const get       =       async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, campuscourses;

    [err, campuscourses]    =   await to (UniversityCampusCourse.findAll({
        include:[{model:Campus},{model:University},{model:Course}]
    }));

    if (err)    return ReE(res, err, 422);

    let unvcamcourse_json = [];
    for (let i in campuscourses) {
        let details     =    campuscourses[i];
        let info        =    details.toWeb();
        unvcamcourse_json.push(info);
    }
    return ReS(res, {universitycampuscourse: unvcamcourse_json})
}

module.exports.get  =   get;

//Campus Wise course
const getOne       =       async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, campuscourses;
    let id = parseInt(req.params.campusid);

    [err, campuscourses]    =   await to (UniversityCampusCourse.findAll({
        where : {
            campus_id : id
        },
        include:[{model:Campus},{model:University},{model:Course}]
    }));

    if (err)    return ReE(res, err, 422);

    let unvcamcourse_json = [];
    for (let i in campuscourses) {
        let details     =    campuscourses[i];
        let info        =    details.toWeb();
        unvcamcourse_json.push(info);
    }
    return ReS(res, {universitycampuscourse: unvcamcourse_json})
};

module.exports.getOne  =   getOne;

const  remove   =   async  (req,res)   => {
    res.setHeader('Content-Type', 'application/json');
    let campuscourses, err,data ;
    let id = req.params.id;
    data    =   req.body;
    [err, campuscourses] = await to(UniversityCampusCourse.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete University Campus Course');

    return ReS(res, {message:'Deleted  University University Campus Course'}, 204);
};
module.exports.remove   =   remove;