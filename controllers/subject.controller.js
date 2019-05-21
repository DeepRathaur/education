const { Subject } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const { Class, Stream, SubjectClass, SubjectStream } = require('../models');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let classes = body.class_id;
    let stream = body.stream_id;

    let err, subject;

    [err, subject] = await to(Subject.create(body));

    if (err) return ReE(res, err, 422);

    if (classes.length > 0) {

        for (let i in classes) {
            let bodySub = { SubjectId: subject.id, ClassId: classes[i] };
            let subjectclass;
            [err, subjectclass] = await to(SubjectClass.create(bodySub));
            //if (err) return ReE(res, err, 422);
        }
    }

    if (stream.length > 0) {
        for (let i in stream) {
            let bodyStr = { SubjectId: subject.id, StreamId: stream[i] };
            let subjectstream;
            [err, subjectstream] = await to(SubjectStream.create(bodyStr));
            //if (err) return ReE(res, err, 422);
        }
    }
    return ReS(res, { message: 'successfully created new subject', subject: subject.toWeb() }, 201);
}

module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, subjects;

    [err, subjects] = await to(Subject.findAndCountAll({
        order: [['name', 'ASC']],
        include: [
            { model: SubjectClass }, { model: SubjectStream }
        ]
    }));

    if (err) return ReE(res, err, 422);
    let subject_json = []

    if (subjects.count > 0) {
        for (let i in subjects.rows) {
            let details = subjects.rows[i];
            let info = details.toWeb();
            subject_json.push(info);
        }
        return ReS(res, { subjects: subject_json });
    } else {
        return ReE(res, { messgae: 'Record not found' });
    }
}

module.exports.getAll = getAll;


const get = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    let classid = req.params.classid;
    let streamid = req.params.streamid;

    if (!classid) {
        return ReE(res, 'class id is mandatory.');
    } else if (!streamid) {
        return ReE(res, 'stream id is mandatory.');
    } else {
        let err, subjects;
        [err, subjects] = await to(SubjectClass.findAll({
            where:{ClassId : classid},
            include:[{model:Subject}]
        }));

        if (err) return (res, err, 422);


        [err, subjects] = await to(SubjectStream.findAll({
            where:{StreamId : streamid},
            include:[{model:Subject}]
        }));

        if (err) return (res, err, 422);

        let subject_json = [];

        for (let i in subjects) {
            let details = subjects[i];
            let info = details.toWeb();
            subject_json.push(info);

        }
        return ReS(res, { subjects: subject_json });
    }
}

module.exports.get = get;

const update = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let subjects, err, data;
    let id = req.params.id;
    data = req.body;

    if (!data.name) {
        return ReE(res, 'Please enter subject name');
    } else {

        [err, subjects] = await to(Subject.update(data, {
            where: { id: id }
        }))

        if (err) return ReE(res, err, 422);

        return ReS(res, { message: 'updated Subject' });
    }
}
module.exports.update = update;


const remove = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, subjects;
    let id = req.params.id;

    [err, subjects] = await to(Subject.destroy({
        where: { id: id }
    }))

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Deleted Subjects' }, 204);

}
module.exports.remove = remove;