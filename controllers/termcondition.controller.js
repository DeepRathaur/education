const { TermConditions }    =    require('../models');
const { to, ReE, ReS }      =    require('../services/util.service');

const create    =   async (req, res)    =>   {
    res.setHeader('Content-Type', 'application/json');
    let body    =   req.body;
    let err, termcond ;
    if (!body.description) {
        return ReE(res,'Term Condition description is mandatory.');
    } else {
        [err, termcond]    =   await to(TermConditions.create(body));
        if (err)    return ReE(res, err, 422);

        return ReS(res, {
            message: 'Successfully created new Term condition.',
            TermConditions: termcond.toWeb()
        }, 201);
    }
}
module.exports.create   =   create;  

const get   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, termcond;
    [err, termcond]    =   await to(TermConditions.findAll());
    if (err)    return ReE(res, err, 422);

    let termcond_json = [];
    for (let i in termcond) {
        let details =   termcond[i];
        let info    =   details.toWeb();
        termcond_json.push(info);
    }
    
    return ReS(res, {termconditions:termcond_json});
}
module.exports.get  =   get; 

const update   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, termcond, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.description) {
        return ReE(res, 'Term Condition description is mandatory.');
    }else {

        [err, termcond] = await to(TermConditions.update(data, {
            where: {id:id}
        }));

        if(err) {
            if(err)   return ReE(res, err, 422);
        }
        return ReS(res,  {message:'Updated Term Condition'});
    }
}
module.exports.update  =   update;

const remove    =   async function (req, res) {
    let termcond, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, termcond] = await to(TermConditions.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete Term Condition ');

    return ReS(res, {message:'Deleted Term Condition'}, 204);

}
module.exports.remove = remove;