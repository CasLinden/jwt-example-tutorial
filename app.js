const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.get('/api',(req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: 'post created',
                authData
            })
        }
    })
    res.json({
        message: 'Post created'
    });
});

app.post('/api/login', (req, res) => {
    // Mock user 
    const user = {
        id: 1, 
        username: 'cas',
        email: 'cas@gmail.com'
    }
    jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        })
    });
});

function verifyToken(req, res, next) {
 const bearerHeader = req.headers['authorization']
 if(typeof bearerHeader !== 'undefined'){
    // Token format:
    // Authorizaation: Bearer <access_token>
    // so lets split it at the space
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
 } else {
    res.sendStatus(403);
 };
};

app.listen(5003, () => console.log('server running on 5003'));