'use strict';
const { to, ReE, ReS }  = require('../services/util.service');
exports.allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        let err;
        if(!(accessLevel & req.user.role_id)) {
            ReE(res, err, 403);
            return;
        }
        callback(req, res);
    }
    return checkUserRole;
};