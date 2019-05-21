const { City, State  }   =   require('../models');
const { to, ReE, ReS }   = require('../services/util.service');

const create    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body   =   req.body;
    if(!body.name)   {
        return ReE(res, 'Please enter a name of city.');
    }else {
        let err, cities;

        [err, cities]   =   await to(City.create(body));

        if (err) ReE(res, err, 422);

        return ReS(res, {message: 'Successfully created new city.', city:cities.toWeb()}, 201);
    }
}

module.exports.create   =   create;

const getAll    =   async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, cities;

    [err, cities]   =   await to(City.findAll({
        order:[['name','ASC']],
        include:[{model:State}]
    }));

    if (err)    ReE(res, err, 422)

    let  city_json    =   []

    for(let i in cities)   {
        let citiesdetails = cities[i];
        let cities_info = citiesdetails.toWeb();
        city_json.push(cities_info);
    }
    return ReS(res, {cities: city_json});
}

module.exports.getAll   =   getAll;

const getOne   =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let id = parseInt(req.params.id);
    let err, cities;

    [err, cities]    =   await to(City.findAll({
        where: {
            state_id:id
        },
        order:[['name','ASC']],
        include:[{model:State}]
    }));

    if (err)    return ReE(res, err, 422);

    let city_json    =   [];
    for (let i in cities) {
        let details     =    cities[i];
        let info        =    details.toWeb();
        city_json.push(info);
    }
    return ReS(res, {cities: city_json});
};

module.exports.getOne  =   getOne;


const update    =   async function (req,res) {
    let err, city, data
    let id  =   req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of city.');
    }else {

        [err, city] = await to(City.update({
            name: data.name,
        }, {
            where: {id:id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of city is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated city : '+ data.name});
    }
}

module.exports.update   =   update;

const remove    =   async function (req, res) {
    let city, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, city] = await to(City.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete city');

    return ReS(res, {message:'Deleted city'}, 204);

}
module.exports.remove = remove;