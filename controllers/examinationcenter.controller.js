const { UnvExaminationCenter, Campus, University, State }     =   require('../models');
const {to, ReE, ReS} = require('../services/util.service');

const  create   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;
    let universityId = parseInt(body.university_id);
    let campusId = parseInt(body.campus_id);
    let stateId  = parseInt(body.state_id);
    if (!universityId) {
        return ReE(res, 'University is mandatory.');
    } else if (!campusId) {
        return ReE(res, 'campus is mandatory.');
    } else if (!stateId) {
        return ReE(res, 'State is mandatory.');
    } else  {
        let err, examinationcenter, campus, university;

        [err, university] = await to(checkUniversity(universityId));
        if (err) return ReE(res, err, 422);
        if (!university) return ReE(res, 'University not found on given input.', 404);

        [err, campus] = await to(checkCampus(campusId));
        if (err) return ReE(res, err, 422);
        if (!campus) return ReE(res, 'Campus not found on given input.', 404);
        if (campus.university_id != universityId) return ReE(res, 'Campus not found on selected university.', 404);

        let stateId =   body.state_id ;

        let data=[];
        for (let value of stateId) {
            let body    =   {university_id:universityId,campus_id:campusId,state_id:value };
            data.push(body);
        }
        [err, examinationcenter] = await to(UnvExaminationCenter.bulkCreate(data));

        if (err) return ReE(res, err, 422);

        return ReS(res, {
            message: 'Successfully created new University Examination Center.',
            unvHowtoApply: examinationcenter
        }, 201);
    }
};
module.exports.create   =   create;


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

const get   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, examinationcenter;

    [err, examinationcenter]    =   await to(UnvExaminationCenter.findAll({
        include:[{model: University},{model: Campus}, {model: State}]
    }));

    if (err)    return ReE(res, err, 422);

    let unvhowtoapp_json    =   [];
    for (let i in examinationcenter) {
        let details     =    examinationcenter[i];
        let info        =    details.toWeb();
        unvhowtoapp_json.push(info);
    }
    return ReS(res, {examinationcenter: unvhowtoapp_json});
};

module.exports.get  =   get;


const getOne   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.campusid);
    let err, examinationcenter;

    [err, examinationcenter]    =   await to(UnvExaminationCenter.findAll({
        where: {
            campus_id:id
        },
        include:[{model: University},{model: Campus}, {model: State}]
    }));

    if (err)    return ReE(res, err, 422);

    let unvhowtoapp_json    =   [];
    for (let i in examinationcenter) {
        let details     =    examinationcenter[i];
        let info        =    details.toWeb();
        unvhowtoapp_json.push(info);
    }
    return ReS(res, {examinationcenter: unvhowtoapp_json});
};

module.exports.getOne  =   getOne;

const  update   =   async  (req,res)   => {
    res.setHeader('Content-Type', 'application/json');
    let err, examinationcenter, data
    let id = req.params.id;
    data = req.body;
    [err, examinationcenter] = await to(UnvExaminationCenter.update(data, {
        where: {id: id}
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res,  {message:'Updated Examination Center : '});
}
module.exports.update   =   update;

const  remove   =   async  (req,res)   => {
    res.setHeader('Content-Type', 'application/json');
    let examinationcenter, err, data ;
    let id = req.params.id;
    data    =   req.body;
    [err, examinationcenter] = await to(UnvExaminationCenter.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete University Examination Center');

    return ReS(res, {message:'Deleted  University Examination Center'}, 204);
}
module.exports.remove   =   remove;