const { AboutUS }       =    require('../models');
const { to, ReE, ReS }  =    require('../services/util.service');

const create    =   async (req, res)    =>   {
    res.setHeader('Content-Type', 'application/json');
    let body    =   req.body;
    let err, about ;
    if (!body.description) {
        return ReE(res,'About Us description is mandatory.');
    } else {
        [err, about]    =   await to(AboutUS.create(body));
        if (err)    return ReE(res, err, 422);

        return ReS(res, {
            message: 'Successfully created new about us.',
            About: about.toWeb()
        }, 201);
    }
}
module.exports.create   =   create;  

const get   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, abouts;
    [err, abouts]    =   await to(AboutUS.findAll());
    if (err)    return ReE(res, err, 422);

    let about_json = [];
    for (let i in abouts) {
        let details =   abouts[i];
        let info    =   details.toWeb();
        about_json.push(info);
    }
    
    return ReS(res, {aboutus:about_json});
}
module.exports.get  =   get; 

const update   =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, abouts, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.description) {
        return ReE(res, 'About Us description is mandatory.');
    }else {

        [err, abouts] = await to(AboutUS.update(data, {
            where: {id:id}
        }));

        if(err) {
            if(err)   return ReE(res, err, 422);
        }
        return ReS(res,  {message:'Updated About Us'});
    }
}
module.exports.update  =   update;

const remove    =   async function (req, res) {
    let abouts, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, abouts] = await to(AboutUS.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete about us');

    return ReS(res, {message:'Deleted About US'}, 204);

}
module.exports.remove = remove;