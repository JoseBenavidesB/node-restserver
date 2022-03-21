
const { response, request } = require('express')

const userGet = (req = request, res = response) => {
    const params = req.query;
    res.json({
        msg: 'hello from controlador',
        params
    })
};

const userPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put hello',
        id,
    })
};

const userPost = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: 'post hello',
        body
    })
};

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete hello-- controller'
    })
};


const userPatch = (req, res = response) => {
    res.json({
        msg: 'Parch hello-- controller'
    })
};


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}