const {
    Alert, Campus, University, UnversityCategory, UnvImportantDate, UnvHowToApply, UnvImportantLink,
    UnvExaminationPattern, UnvEligibilityCriteria, Course, City, State
} = require('../models');
const {to, ReE, ReS} = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;
    let universityId = parseInt(body.university_id);
    let campusId = parseInt(body.campus_id);

    if (!universityId) {
        return ReE(res, 'University is mandatory.');
    } else if (!campusId) {
        return ReE(res, 'campus is mandatory.');
    } else {
        let err, campus, university, alerts;

        [err, university] = await to(checkUniversity(universityId));
        if (err) return ReE(res, err, 422);
        if (!university) return ReE(res, 'University not found on given input.', 404);

        [err, campus] = await to(checkCampus(campusId));
        if (err) return ReE(res, err, 422);
        if (!campus) return ReE(res, 'Campus not found on given input.', 404);
        if (campus.university_id != universityId) return ReE(res, 'Campus not found on selected university.', 404);

        [err, alerts] = await to(Alert.create(body));

        if (err) ReE(res, err, 422);

        let course = body.course_id;

        let stream = body.stream_id;

        let state = body.state_id;

        if (course.length > 0) {

            alerts.addCourse(course);         //Add course id and alert id in association table

            [err, alerts] = await to(alerts.save());

            if (err) return ReE(res, err, 422);
        }

        if (stream.length > 0) {

            alerts.addStream(stream);         //Add course id and alert id in association table

            [err, alerts] = await to(alerts.save());

            if (err) return ReE(res, err, 422);
        }

        if (state.length > 0) {

            alerts.addState(state);         //Add course id and alert id in association table

            [err, alerts] = await to(alerts.save());

            if (err) return ReE(res, err, 422);
        }

        return ReS(res, {
            message: 'Successfully created new Alert.',
            alert: alerts.toWeb()
        }, 201);
    }
};
module.exports.create = create;

const checkCampus = async (req, res) => {
    let err, campus;
    [err, campus] = await to(Campus.findOne({
        where: {
            id: req
        }
    }));
    if (err) return ReE(res, err, 422);
    return campus;
};

const checkUniversity = async (req, res) => {
    let err, university;
    [err, university] = await to(University.findOne({
        where: {
            id: req
        }
    }));

    if (err) return ReE(res, err, 422);
    return university;
};


const getAll = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, alerts;

    [err, alerts] = await to(Alert.findAll({
        order: [['name', 'ASC']],
        include: [{model: University}, {model: Campus}]
    }));

    if (err) ReE(res, err, 422);
    let alert_json = [];

    for (let i in alerts) {
        let details = alerts[i];
        let info = details.toWeb();
        alert_json.push(info);
    }
    return ReS(res, {alerts: alert_json});
};

module.exports.getAll = getAll;


const getAlert = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, user, universities, alerts;
    user = req.user;

    [err, alerts] = await to(Alert.findAll({}));

    if (err) ReE(res, err, 422);

    let alert_json = [];

    for (let i in alerts) {
        let details = alerts[i];
        let UniversityId = details.university_id;
        let CampusId = details.campus_id;
        let alertId = alerts[i].id;
        let alertName = alerts[i].name;
        let alertDescription = alerts[i].descriptions;
        let alertDatefrom = alerts[i].datefrom;
        let alertDateto = alerts[i].dateto;

        if (details.Courses) {
            let courses = details.Courses;
            let courseLength = details.Courses.length;
            if (courseLength > 0) {
                for (let j in courses) {
                    let courseId = courses[j].id;
                    let courseName = courses[j].name;
                    if (courseId === user.course_id) {
                        let info = {
                            id: alertId,
                            name: alertName,
                            descriptions: alertDescription,
                            datefrom: GetFormattedDate(alertDatefrom),
                            dateto: GetFormattedDate(alertDateto),
                            unversityid: UniversityId,
                            campusid: CampusId,
                            courseId: courseId,
                            courseName: courseName
                        };
                        alert_json.push(info);
                    }
                }
            }
        }

        if (details.Streams) {
            let streams = details.Streams;
            let streamLength = details.Streams.length;
            if (streamLength > 0) {
                for (let j in streams) {
                    let streamId = streams[j].id;
                    let streamName = streams[j].name;
                    if (streamId === user.stream_id) {
                        let info = {
                            id: alertId,
                            name: alertName,
                            descriptions: alertDescription,
                            datefrom: GetFormattedDate(alertDatefrom),
                            dateto: GetFormattedDate(alertDateto),
                            unversityid: UniversityId,
                            campusid: CampusId,
                            streamId: streamId,
                            streamName: streamName
                        }
                        if (alert_json[j].id != alertId) {
                            alert_json.push(info);
                        }
                    }
                }
            }
        }

        /* if (details.States) {
            let states      =  details.States;
            let stateLength = details.States.length;

            if (stateLength > 0) {
                console.log(stateLength);
                for (let j in states) {
                    let stateId   = states[j].id;
                    let stateName = states[j].name;
                    if (streamId === user.stream_id) {
                        let info = {
                            id:alertId,
                            name: alertName,
                            descriptions: alertDescription,
                            datefrom: GetFormattedDate(alertDatefrom),
                            dateto:   GetFormattedDate(alertDateto),
                            unversityid: UniversityId,
                            campusid: CampusId,
                            streamId: streamId,
                            streamName: streamName
                        }
                        alert_json.push(info);
                    }
                }
            }
        } */
    }
    //console.log(alert_json.length);

    return ReS(res, {alerts: alert_json});
};

module.exports.getAlert = getAlert;


const getAlertdetails = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let alertid = parseInt(req.params.alertid);
    //let unvcampuscourseId   =   parseInt(req.params.UnvcampuscourseId) ;

    if (!alertid) {
        return ReE(res, 'Alert id is mandatory.');
    } else {
        let err, user, universities, alerts;

        [err, alerts] = await to(Alert.findById(alertid));

        if (err) return ReE(res, err, 422);

        if (!alerts) {
            return ReE(res, 'No record found');
        } else {
            let universityId = alerts.university_id;
            let campusId = alerts.campus_id;

            [err, universities] = await to(University.findAll({
                where: {
                    id: universityId
                },
                include: [
                    {model: Campus, where: {id: campusId}},
                    {model: UnversityCategory},
                    {model: State},
                    {model: City},
                    {model: UnvHowToApply, where: {university_id: universityId, campus_id: campusId}, required: false},
                    {
                        model: UnvEligibilityCriteria,
                        where: {university_id: universityId, campus_id: campusId},
                        required: false
                    },
                    {
                        model: UnvImportantDate,
                        where: {university_id: universityId, campus_id: campusId},
                        required: false
                    },
                    {
                        model: UnvImportantLink,
                        where: {university_id: universityId, campus_id: campusId},
                        required: false
                    },
                    {
                        model: UnvExaminationPattern,
                        where: {university_id: universityId, campus_id: campusId},
                        required: false
                    }
                ]
            }));

            if (err) ReE(res, err, 422);
            let university_json = []
            let keysInfo = []
            for (let i in universities) {
                let details = universities[i];
                let info = details.toWeb();
                keysInfo = Object.keys(info);
                university_json.push(info);
            }
            // Add fields in display fields array which is show on mobile app
            for (var i = keysInfo.length - 1; i--;) {
                if (keysInfo[i] === 'id' || keysInfo[i] === 'status' || keysInfo[i] === 'createdAt' || keysInfo[i] === 'updatedAt') keysInfo.splice(i, 1);
            }
            return ReS(res, {universitydetails: university_json, dispalayfields: keysInfo});
        }
    }
};
module.exports.getAlertdetails = getAlertdetails;

function GetFormattedDate(date) {
    let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    let day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let year = date.getFullYear();
    return day + '/' + monthIndex + '/' + year;
}