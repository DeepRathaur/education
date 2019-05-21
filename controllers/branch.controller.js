/**
 * @Branch Controller
 */
const {Branch} = require('../models');
const {Course} = require('../models');
const {to, ReE, ReS} = require('../services/util.service');

/**
 * @Create Branches
 * @param name,courseid
 */

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, branch, course;
    let branch_info = req.body;

    if (!branch_info.name) {
        return ReE(res, 'Please input branch name.');
    } else if (!branch_info.course_id) {
        return ReE(res, 'Please select course before enter branch.');
    } else {
        course = branch_info.course_id;

        [err, branch] = await to(Branch.create(branch_info));

        if (err) return ReE(res, err, 422);

        branch.addCourse([course]);         //Add course id and branch id in association table

        [err, branch] = await to(branch.save());

        if (err) return ReE(res, err, 422);

        let branch_json = branch.toWeb();
        branch_json.course = [{course: course}];

        return ReS(res,  {message: 'Successfully created new branch.', branches: branch_json}, 201);
    }
};
module.exports.create = create;

/**
 * @Get All Branches
 */
const getAll = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let err, branches;

    [err, branches] = await to(Branch.findAll({
        order: [['name', 'ASC']],
        include: [{model: Course}]
    }));

    if (err) return ReE(res, err, 422);

    let branch_json = [];

    for (let i in branches) {
        let details = branches[i];
        let info = details.toWeb();
        branch_json.push(info);
    }
    return ReS(res, {branches: branch_json});
};

module.exports.getAll = getAll;

/**
 * @Get course wise All Branches
 * @params course id
 * @returns all branch associated to course
 */

const get = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let courseId = parseInt(req.params.id);
    if (!courseId) {
        return ReE(res, 'course id is mandatory in get method.');
    } else {
        let err, branches;

        [err, branches] = await to(Branch.findAll({
            order: [['name', 'ASC']],
            include: [{
                model: Course,
                where: {
                    id: courseId
                }
            }]
        }));

        if (err) return ReE(res, err, 422);

        let branch_json = [];

        for (let i in branches) {
            let details = branches[i];
            let info = details.toWeb();
            branch_json.push(info);
        }
        return ReS(res, {branches: branch_json});
    }
};

module.exports.get = get;

/**
 * @Update  Branches
 * @params branch id
 * @returns updated branch
 */

const  update   =   async (req, res)    => {
    let err, branch, data;
    let branch_id = req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of branch.');
    }else {
        [err, branch] = await to(Branch.update({
            name: data.name,
        }, {
            where: {id:branch_id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of branch is already exist';
            return ReE(res, err);
        }

        return ReS(res,  {message:'Updated Branch : '+ data.name});
    }
};

module.exports.update  =   update;


/**
 * @Delete Branches
 * @params branch id
 * @returns 204
 */

const  remove   =   async (req, res)    => {
    let branch, err, data ;
    let branch_id = req.params.id;
    data    =   req.body;
    [err, branch] = await to(Branch.destroy({
        where: {id:branch_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete branch');

    return ReS(res, {message:'Deleted Branch'}, 204);
};

module.exports.remove  =   remove;