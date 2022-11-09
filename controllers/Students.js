const db = {
    students: [
        { id: 0, firstName: 'Ion', lastName: 'Ionel' },
        { id: 1, firstName: 'Ion', lastName: 'Ionel' }
    ]
}


class Students {
    getAll(req, res) {
        res.send(db);
    }

    get(res, req) {
        const result = db.students.find(elem => elem.id === req.params.id);
        res.send(result);
    }

    create(res, req) {

    }

    delete(res, req) {

    }

    update(res, req) {

    }
}