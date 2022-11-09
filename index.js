const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());


const JWT_KEY = 'sfwennfwkfiwo';

app.get('/students', (req, res) => {
    res.send(db);
});

const parseId = (req, res, next) => {
    req.params.id = parseInt(req.params.id);
    next();
};

const JWTMiddleware = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        res.status(400).send();
        return;
    }
    token = token.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        res.tokenPayload = decoded;
    } catch (e) {
        res.status(400).send();
        return;
    }

    next();
}

app.get('/students/:id', parseId, (req, res) => {
    const result = db.students.find(elem => elem.id === req.params.id);
    res.send(result);
});

let lastId = 1;
app.post('/students', JWTMiddleware, (req, res) => {
    lastId += 1;
    const isAdmin = res.tokenPayload.role === 'ADMIN';
    if (!isAdmin) {
        res.status(403).send();
    }

    const newStudent = {
        id: lastId,
        ...req.body
    };
    db.students.push(newStudent);
    res.send(newStudent);
});

app.post('/login', JWTMiddleware, async (req, res) => {
    const { username, password } = req.body;
    if (username === 'ion' && password === 'password') {

        res.send(JSON.stringify({
            token: jwt.sign({
                role: 'ADMIN',
            }, JWT_KEY),
        }));
        return;
    }
    res.status(400).send(JSON.stringify({
        token: null,
    }));
});

app.listen(8080);