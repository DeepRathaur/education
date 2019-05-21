const { FormSchedule } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, formschedules, checkisIdUnique, countAppointment;
    let user = req.user;
    let body = req.body;
    if (!body.booked_date) {
        return ReE(res, 'Booking date is mandatory.');
    } else if (!body.book_timeslot) {
        return ReE(res, 'Booking time slot is mandatory.');
    } else {

        [err, checkisIdUnique] = await to(isAppointmentUnique(body));
        if (err) return ReE(res, err, 422);
        if (checkisIdUnique) return ReE(res, 'You are already booked an appointment.', 202);

        [err, countAppointment] = await to(isAppointmentCount(body));
        if (err) return ReE(res, err, 422);
        
        if (countAppointment > 3) return ReE(res, 'The time slot not available for this appointment.', 202);

        [err, formschedules] = await to(FormSchedule.create(body));

        if (err) return ReE(res, err, 422);

        return ReS(res, {
            message: 'Successfully created new appointment.',
            Appointment: formschedules.toWeb()
        }, 201);
    }
}
module.exports.create = create;

const isAppointmentUnique = async (req, res) => {
    let err, checkformschedules;

    [err, checkformschedules] = await to(FormSchedule.findOne({
        where: {
            user_id: req.user_id,
            booked_date: req.booked_date,
            book_timeslot: req.book_timeslot
        }
    }));

    if (err) return ReE(res, err, 422);
    return checkformschedules;
}

const isAppointmentCount = async (req, res) => {
    let err, checkcheckcountAppoi;

    [err, checkcheckcountAppoi] = await to(FormSchedule.count({
        where: {
            booked_date: req.booked_date,
            book_timeslot: req.book_timeslot
        }
    }));

    if (err) return ReE(res, err, 422);
    return checkcheckcountAppoi;
}

const getByDate     =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let date = req.params.date;
    let err, formSchedules;
    [err, formSchedules]     =   await to (FormSchedule.findAll({
       where: {
        booked_date : date
       }
    }));
    
    if (err)    return ReE(res, err, 422);

    let appointment_json = [];
    for (let i in formSchedules) {
        let details =   formSchedules[i];
        let info    =   details.toWeb();
        appointment_json.push(info);
    }
    return ReS(res, {appointments:appointment_json});
    
}
module.exports.getByDate    =   getByDate ;

const remove    =   async function (req, res) {
    let formSchedules, err ;
    let id = req.params.id;
    data    =   req.body;
    [err, formSchedules] = await to(FormSchedule.destroy({
        where: {id:id}
    }));

    if(err) return ReE(res, 'error occured trying to delete form Schedules');

    return ReS(res, {message:'Deleted form Schedules'}, 204);

}
module.exports.remove = remove;