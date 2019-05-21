const { State  }   =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of state.');
    }else {
        let err, states;

        [err, states]   =   await to(State.create(body));

        if (err) ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new state.', state:states.toWeb()}, 201);
    }
}

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, states;

    [err, states]   =   await to(State.findAll({
        order:[['name','ASC']],
    }));

    if (err)    ReE(res, err, 422)

    let  state_json    =   []

    for(let i in states)   {
        let statesdetails = states[i];
        let states_info = statesdetails.toWeb();
        state_json.push(states_info);
    }
    return ReS(res, {states: state_json});
}

module.exports.getAll   =   getAll;


const update    =   async function (req,res) {
    let err, state, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of state.');
    }else {

        [err, state] = await to(State.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of state is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated State : '+ data.name});
    }
}

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let state, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, state] = await to(State.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete state');

    return ReS(res, {message:'Deleted State'}, 204);

}
module.exports.remove = remove;