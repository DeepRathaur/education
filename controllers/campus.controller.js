const { Campus }      =   require('../models');
const { to, ReE, ReS }    =   require('../services/util.service');

const   create      =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;
    if (!body.university_id) {
        return ReE(res, 'University is mandatory.');
    } else if (!body.name) {
        return ReE(res, 'Campus name is mandatory.');
    } else {
        let err, campus;

        [err, campus]   =   await to(Campus.create(body));

        if(err)  return ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new campus', campus:campus.toWeb()}, 201);
    }
};

module.exports.create   =   create;

const getAll    =   async (req, res)   =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, campuses;

    [err, campuses]     =   await to(Campus.findAll({
        order:[['name','ASC']]
    }));

    if (err)   return ReE(res, err, 422);

    let  campus_json    =   [];
    for ( let i in campuses) {
        let details =   campuses[i];
        let info    =   details.toWeb();
        campus_json.push(info);
    }
    return ReS(res, {campuses : campus_json});
}

module.exports.getAll   =   getAll;

/**
 * @Get Camus University Wise
 * @prams University Id
 * @return Campus list university wise
 */

const get = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let unversityId = parseInt(req.params.id);
    if (!unversityId) {
        return ReE(res, 'University id is mandatory in get method.');
    } else {
        let err, campuses;

        [err, campuses] = await to(Campus.findAll({
            order: [['name', 'ASC']],
            where: {
                university_id: unversityId
            }
        }));

        if (err) return ReE(res, err, 422);

        let campuse_json = [];

        for (let i in campuses) {
            let details = campuses[i];
            let info = details.toWeb();
            campuse_json.push(info);
        }
        return ReS(res, {campuses: campuse_json});
    }
};

module.exports.get = get;

/**
 * @Update  Campus
 * @params  campus id
 * @returns updated campus
 */

const  update   =   async (req, res)    => {
    let err, campus, data;
    let campus_id = req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of campus.');
    }else {
        [err, campus] = await to(Campus.update({
            name: data.name,
        }, {
            where: {id:campus_id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of campus is already exist';
            return ReE(res, err);
        }

        return ReS(res,  {message:'Updated Campus : '+ data.name});
    }
};

module.exports.update  =   update;


/**
 * @Delete Campus
 * @params campus id
 * @returns 204
 */

const  remove   =   async (req, res)    => {
    let campus, err, data ;
    let campus_id = req.params.id;
    data    =   req.body;
    [err, campus] = await to(Campus.destroy({
        where: {id:campus_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete campus');

    return ReS(res, {message:'Deleted Campus'}, 204);
};

module.exports.remove  =   remove;

