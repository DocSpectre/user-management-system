'use strict';
const { UserController } = require('./controllers/UserController');

module.exports.create = async (event, context, callback) => {
    const body = JSON.parse(event.body);

    const result = await UserController.createUser(body, 'User');
    const response = {
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'Create user!',
            result
        }),
    };
    callback(null, response);
};

module.exports.getById = async (event, context, callback) => {
    const pathParams = event.pathParameters;
    const userIdArray = pathParams.id.split(',');
    const result = await UserController.getUsersById(userIdArray);
    const response = {
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'Get user by id!',
            result
        }),
    };
    callback(null, response);
};


module.exports.getAll = async (event, context, callback) => {
    const result = await UserController.getUserList();
    const response = {
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'Get all user!',
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
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'Update user!',
            result
        }),
    };
    callback(null, response);
};

module.exports.softDelete = async (event, context, callback) => {
    const pathParams = event.pathParameters;

    const result = await UserController.softDeleteUserById(pathParams.id);
    const response = {
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'Soft delete user!',
            result
        }),
    };
    callback(null, response);
};

module.exports.hardDelete = async (event, context, callback) => {
    const pathParams = event.pathParameters;
    const userIdArray = pathParams.id.split(',');

    let result = await UserController.removeUserById(userIdArray);

    const response = {
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'Hard delete user!',
            result
        }),
    };
    callback(null, response);
};