const express = require('express');
const app = express();
app.use(express.json());

const db = {
    students: [
        { id: 0, firstName: 'Ion', lastName: 'Ionel' },
        { id: 1, firstName: 'Ion', lastName: 'Ionel' }
    ]
}

app.get('/students', (req, res) => {
    res.send(db);
});

app.get('/students/:id', (req, res) => {
    const result = db.students.find(elem => elem.id === parseInt(req.params.id));
    res.send(result);
});

let lastId = 1;
app.post('/students', (req, res) => {
    lastId += 1;
    const newStudent = {
        id: lastId,
        ...req.body
    };
    db.students.push(newStudent);
    res.send(newStudent);
});

app.listen(8080);