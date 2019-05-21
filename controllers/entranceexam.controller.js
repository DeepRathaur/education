const { EntranceExam }      =   require('../models');
const { to, ReE, ReS }    =   require('../services/util.service');

const create    =   async (req, res)     => {
    res.setHeader('Content-Type', 'application/json');
    let err, entranceexam;
    let body = req.body;

    if (!body){
        return ReE(res, 'Body is empty');
    }else {
        [err, entranceexam]   =   await to (EntranceExam.create(body));

        if (err)   return ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new entranceexam.', entranceexam: entranceexam.toWeb()}, 201);
    }
};

module.exports.create   =   create;

const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, entranceexams;

    [err, entranceexams]     =   await to (EntranceExam.findAll({
        order:[['id','DESC']]
    }));

    if (err)    return ReE(res, err, 422);

    let entranceexam_json = [];
    for (let i in entranceexams) {
        let details =   entranceexams[i];
        let info    =   details.toWeb();
        entranceexam_json.push(info);
    }
    return ReS(res, {entranceexams:entranceexam_json});
}
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, entranceexam, data;
    let entranceexam_id = req.params.id;
    data = req.body;
    [err, entranceexam] = await to(EntranceExam.update(data, {
        where: {id: entranceexam_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'Something was wrong';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated entranceexam : '});
}

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let entranceexam, err ;
    let entranceexam_id = req.params.id;
    data    =   req.body;
    [err, entranceexam] = await to(EntranceExam.destroy({
        where: {id:entranceexam_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete entranceexam');

    return ReS(res, {message:'Deleted entranceexam'}, 204);
}

module.exports.remove   =   remove;