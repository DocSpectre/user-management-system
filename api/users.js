'use strict';
const { UserController } = require('./controllers/UserController');

module.exports.create = async (event, context, callback) => {
    const body = JSON.parse(event.body);

    const result = await UserController.createUser(body, 'User');
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Create user!',
            result
        }),
    };
    callback(null, response);
};

module.exports.getById = async (event, context, callback) => {
    const pathParams = event.pathParameters;

    const result = await UserController.getUserById(pathParams.id);
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Get user!',
            result
        }),
    };
    callback(null, response);
};


module.exports.getAll = async (event, context, callback) => {
    const result = await UserController.getUserList();
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Get user!',
            result
        }),
    };
    callback(null, response);
};

module.exports.update = async (event, context, callback) => {
    const pathParams = event.pathParameters;
    const body = JSON.parse(event.body);

    const result = await UserController.updateUser(body, pathParams.id);
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Get user!',
            result
        }),
    };
    callback(null, response);
};

module.exports.softDelete = async (event, context, callback) => {
    const pathParams = event.pathParameters;

    const result = await UserController.softDeleteUserById(pathParams.id);
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Get user!',
            result
        }),
    };
    callback(null, response);
};

module.exports.hardDelete = async (event, context, callback) => {
    const pathParams = event.pathParameters;

    const result = await UserController.removeUserById(pathParams.id);
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Get user!',
            result
        }),
    };
    callback(null, response);
};