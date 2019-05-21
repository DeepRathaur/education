const { Stream  }   =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create    =   async function (req, res) {
   res.setHeader('Content-Type', 'application/json');
   const body   =   req.body;
   if(!body.name)   {
       return ReE(res, 'Please enter a name of stream.');
   }else {
       let err, streams;

       [err, streams]   =   await to(Stream.create(body));

       if (err) ReE(res, err, 422);

       return ReS(res, {message: 'Successfully created new stream.', stream:streams.toWeb()}, 201);
   }
}

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, streams;

    [err, streams]   =   await to(Stream.findAll({
        order:[['name','ASC']],
    }));

    if (err)    ReE(res, err, 422)

    let  stream_json    =   []

    for(let i in streams)   {
        let streamdetails = streams[i];
        let stream_info = streamdetails.toWeb();
        stream_json.push(stream_info);
    }
    return ReS(res, {streams: stream_json});
}

module.exports.getAll   =   getAll;


const update    =   async function (req,res) {
    let err, stream, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of stream.');
    }else {

        [err, stream] = await to(Stream.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of stream is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated Stream : '+ data.name});
    }
}

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let stream, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, stream] = await to(Stream.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete stream');

    return ReS(res, {message:'Deleted Stream'}, 204);

}
module.exports.remove = remove;