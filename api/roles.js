'use strict';
const { RolesController } = require('./controllers/RolesController');

module.exports.create = async (event, context, callback) => {
    const body = JSON.parse(event.body);

    const result = await RolesController.createRole(body);
    const response = {
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'Created Role!',
            result
        }),
    };
    callback(null, response);
};

module.exports.update = async (event, context, callback) => {
    const pathParams = event.pathParameters;
    const body = JSON.parse(event.body);

    const result = await RolesController.updateRole(parseInt(pathParams.id), body);
    const response = {
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'Updated Role!',
            result
        }),
    };
    callback(null, response);
};

module.exports.getList = async (event, context, callback) => {
    const result = await RolesController.getRoleList();
    const response = {
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'List all Roles!',
            result
        }),
    };
    callback(null, response);
};