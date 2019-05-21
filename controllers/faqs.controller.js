const { Faqs }    =    require('../models');
const { to, ReE, ReS }      =    require('../services/util.service');

const create    =   async (req, res)    =>   {
    res.setHeader('Content-Type', 'application/json');
    let body    =   req.body;
    let err, faqs ;
    if (!body.question) {
        return ReE(res,'FAQs question is mandatory.');
    } else if(!body.answer){
        return ReE(res,'FAQs answer is mandatory.');
    } else {
        [err, faqs]    =   await to(Faqs.create(body));
        if (err)    return ReE(res, err, 422);

        return ReS(res, {
            message: 'Successfully created new faq.',
            faqs: faqs.toWeb()
        }, 201);
    }
}
module.exports.create   =   create;  

const get   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, faqs;
    [err, faqs]    =   await to(Faqs.findAll());
    if (err)    return ReE(res, err, 422);

    let faqs_json = [];
    for (let i in faqs) {
        let details =   faqs[i];
        let info    =   details.toWeb();
        faqs_json.push(info);
    }
    
    return ReS(res, {faqs:faqs_json});
}
module.exports.get  =   get; 

const update   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, faqs, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.question) {
        return ReE(res,'FAQs question is mandatory.');
    } else if(!data.answer){
        return ReE(res,'FAQs answer is mandatory.');
    } else {

        [err, faqs] = await to(Faqs.update(data, {
            where: {id:id}
        }));

        if(err) {
            if(err)   return ReE(res, err, 422);
        }
        return ReS(res,  {message:'Updated FAQs'});
    }
}
module.exports.update  =   update;

const remove    =   async function (req, res) {
    let faqs, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, faqs] = await to(Faqs.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete FAQs ');

    return ReS(res, {message:'Deleted FAQs'}, 204);

}
module.exports.remove = remove;