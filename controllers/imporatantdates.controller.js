const { UnvImportantDate, Campus, University }     =   require('../models');
const {to, ReE, ReS} = require('../services/util.service');

const  create   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;
    let universityId = parseInt(body.university_id);
    let campusId = parseInt(body.campus_id);
    if (!universityId) {
        return ReE(res, 'University is mandatory.');
    } else if (!campusId) {
        return ReE(res, 'campus is mandatory.');
    } else  {
        let err, imporatantdates, campus, university;

        [err, university] = await to(checkUniversity(universityId));
        if (err) return ReE(res, err, 422);
        if (!university) return ReE(res, 'University not found on given input.', 404);

        [err, campus] = await to(checkCampus(campusId));
        if (err) return ReE(res, err, 422);
        if (!campus) return ReE(res, 'Campus not found on given input.', 404);
        if (campus.university_id != universityId) return ReE(res, 'Campus not found on selected university.', 404);

        [err, imporatantdates] = await to(UnvImportantDate.create(body));

        if (err) return ReE(res, err, 422);

        return ReS(res, {
            message: 'Successfully created new University Importants Dates.',
            importantDates: imporatantdates.toWeb()
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
    let err, imporatantdates;

    [err, imporatantdates]    =   await to(UnvImportantDate.findAll({
        include:[{model: University},{model: Campus}]
    }));

    if (err)    return ReE(res, err, 422);

    let unvhowtoapp_json    =   [];
    for (let i in imporatantdates) {
        let details     =    imporatantdates[i];
        let info        =    details.toWeb();
        unvhowtoapp_json.push(info);
    }
    return ReS(res, {importantDates: unvhowtoapp_json});
};

module.exports.get  =   get;


const getOne   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.campusid);
    let err, imporatantdates;

    [err, imporatantdates]    =   await to(UnvImportantDate.findAll({
        where: {
            campus_id:id
        },
        include:[{model: University},{model: Campus}]
    }));

    if (err)    return ReE(res, err, 422);

    let unvhowtoapp_json    =   [];
    for (let i in imporatantdates) {
        let details     =    imporatantdates[i];
        let info        =    details.toWeb();
        unvhowtoapp_json.push(info);
    }
    return ReS(res, {importantDates: unvhowtoapp_json});
};

module.exports.getOne  =   getOne;

const  update   =   async  (req,res)   => {
    res.setHeader('Content-Type', 'application/json');
    let err, imporatantdates, data
    let id = parseInt(req.params.id);
    data = req.body;
    [err, imporatantdates] = await to(UnvImportantDate.update(data, {
        where: {id: id}
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res,  {message:'Updated Important Dates : '});
}
module.exports.update   =   update;

const  remove   =   async  (req,res)   => {
    res.setHeader('Content-Type', 'application/json');
    let imporatantdates, err, data ;
    let id = parseInt(req.params.id);
    data    =   req.body;
    [err, imporatantdates] = await to(UnvImportantDate.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete University Important Date');

    return ReS(res, {message:'Deleted  University Important Date'}, 204);
}
module.exports.remove   =   remove;