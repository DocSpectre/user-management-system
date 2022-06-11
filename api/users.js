'use strict';
const { UserController } = require('./controllers/UserController');

module.exports.create = async (event, context, callback) => {
    // console.log('context > ', context);
    const result = await UserController.createUser({ name: 'John' }, 'User');
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Create user!',
            result
        }),
    };
    callback(null, response);
};


module.exports.getAll = (event, context, callback) => {
    // console.log('context > ', context);
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Get user!',
        }),
    };
    callback(null, response);
};