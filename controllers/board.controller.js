const { Board }     =   require('../models');
const { to, ReE, ReS }  = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if (!body.name) {
        return ReE(res, 'Please enter a name of board.');
    } else {
        let err, boards;

        [err, boards] = await to(Board.create(body));

        if (err) return ReE(res, err, 422);
        return ReS(res, {message: 'Successfully created new board.', board: boards.toWeb()}, 201);
    }
}

module.exports.create   =   create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, boards

    [err, boards] = await to(Board.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let board_json = []

    for (let i in boards) {
        let boardsdetails = boards[i];
        let board_info = boardsdetails.toWeb();
        board_json.push(board_info);
    }
    return ReS(res, {boards: board_json});
}

module.exports.getAll   =   getAll;

const update    =   async function (req, res) {
    let err, board, data
    let board_id = req.params.id;
    data    =   req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of board.');
    }else {

        [err, board] = await to(Board.update({
            name: data.name,
        }, {
            where: {id:board_id}
        }));

        if(err) {
            if(err.message=='Validation error') err =   'The name of board is already exist';
            return ReE(res, err);
        }
        return ReS(res,  {message:'Updated Board : '+ data.name});
    }
}

module.exports.update      =    update  ;


const remove    =   async function (req, res) {
    let board, err ;
    let board_id = req.params.id;
    data    =   req.body;
    [err, board] = await to(Board.destroy({
        where: {id:board_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete board');

    return ReS(res, {message:'Deleted Bord'}, 204);

}
module.exports.remove = remove;