const { iticollegetrade, iticollegetradetrade, ititrade }       =    require('../models');
const { to, ReE, ReS }  =    require('../services/util.service');

const create    =   async (req, res)    =>   {
    res.setHeader('Content-Type', 'application/json');
    let body    =   req.body;
    let err, collegetrades ;
    if (!body.trades.length == 0) {
        return ReE(res,'collegetrades  is mandatory.');
    } else {
        if (body.trades.length > 0) {
            let data    =   {college_id : body.college_id , trade_id : body.trades[i]} ;
            [err, collegetrades] = await to(iticollegetrade.create(data));

            if (err)    return ReE(res, err, 422);
        }
        return ReS(res, {
            message: 'Successfully created new collegetrades.',
            collegetrades: collegetrades.toWeb()
        }, 201);
    }
};
module.exports.create   =   create;  

const getAll   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, collegetradess;
    [err, collegetradess]    =   await to(iticollegetrade.findAll({
        include: [
            {model: ititrade }
        ]
    }));
    if (err)    return ReE(res, err, 422);

    let collegetrades_json = [];
    for (let i in collegetradess) {
        let details =   collegetradess[i];
        let info    =   details.toWeb();
        collegetrades_json.push(info);
    }
    
    return ReS(res, {iticollegetrade:collegetrades_json});
};
module.exports.getAll  =   getAll;

const update   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, collegetradess, data;
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'collegetrades code is mandatory.');
    }else {

        [err, collegetradess] = await to(iticollegetrade.update(data, {
            where: {id:id}
        }));

        if(err) {
            if(err)   return ReE(res, err, 422);
        }
        return ReS(res,  {message:'Updated collegetrades'});
    }
};
module.exports.update  =   update;

const remove    =   async function (req, res) {
    let collegetradess, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, collegetradess] = await to(iticollegetrade.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete collegetrades ');

    return ReS(res, {message:'Deleted collegetrades '}, 204);

};
module.exports.remove = remove;