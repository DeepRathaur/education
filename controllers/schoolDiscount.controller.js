const { SchoolDiscounts, Schools } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const { generateCoupon } = require('../services/promocode.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if (!body.school_id) {
        return ReE(res, 'School is mandatory.');
    } else {
        let err, coupons, schooldiscount;
        let data = { prefix: body.prefix, postfix: body.postfix, length: body.length, count: body.count };
        [err, coupons] = await to(generateCoupon(data));

        if (err) ReE(res, err, 422);

        if (coupons) {
            if (coupons.length == body.count) {
                let schooldiscountdata = [];
                
                coupons.forEach(element => {
                    let row = {
                        school_id: body.school_id,
                        discount: body.discount,
                        expiry_date: body.expiry_date,
                        coupon_code: element,
                        createdAt:new Date(),
                        updatedAt:new Date()
                    };
                    schooldiscountdata.push(row);
                });
                
                [err, schooldiscount] = await to(SchoolDiscounts.bulkCreate(schooldiscountdata));

                if (err) ReE(res, err, 422);

                return ReS(res, { message:'School discount save successfully.' }, 201);
            } else {
                return ReE(res, 'Coupon generation error.', 202);
            }
        }
    }
}

module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, schoolsDiscount;

    [err, schoolsDiscount] = await to(SchoolDiscounts.findAll({
        include: [
            { model: Schools }
        ]
    }));

    if (err) ReE(res, err, 422)

    let schoolDis_json = []

    for (let i in schoolsDiscount) {
        let details = schoolsDiscount[i];
        let info = details.toWeb();
        schoolDis_json.push(info);
    }
    return ReS(res, { schoolsDiscount: schoolDis_json });
}

module.exports.getAll = getAll;


const update = async function (req, res) {
    let err, school, data
    let id = req.params.id;
    data = req.body;
    if (!data.name) {
        return ReE(res, 'Please enter a name of school.');
    } else {

        [err, school] = await to(Schools.update(data, {
            where: { id: id }
        }));

        if (err) {
            if (err.message == 'Validation error') err = 'The name of school is already exist';
            return ReE(res, err);
        }
        return ReS(res, { message: 'Updated School : ' + data.name });
    }
}

module.exports.update = update;

const remove = async function (req, res) {
    let school, err;
    let id = req.params.id;
    data = req.body;
    [err, school] = await to(SchoolDiscounts.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete school');

    return ReS(res, { message: 'Deleted school' }, 204);

}
module.exports.remove = remove;