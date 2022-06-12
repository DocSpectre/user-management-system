const { AuthController } = require('./controllers/AuthController');
const utils = require('./helpers/utils');

module.exports.signin = async (event, context, callback) => {
    const body = JSON.parse(event.body);

    const result = await AuthController.loginAuth(body);
    const response = {
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'User signin!',
            result
        }),
    };
    callback(null, response);
};


module.exports.signout = async (event, context, callback) => {
    const body = JSON.parse(event.body);

    const result = null;
    const response = {
        statusCode: result?.code || 200,
        body: JSON.stringify({
            message: 'User signout',
            result
        }),
    };
    callback(null, response);
};

module.exports.authorize = async (event, context, callback) => {
    try {
        const token = event.authorizationToken;

        const decoded = await AuthController.verifyToken(token);
        const effect = decoded.roleId === 1 ? 'Allow' : 'Deny';
        const userId = decoded.userId;
        const authorizerContext = { user: userId };

        const policyDocument = utils.buildIAMPolicy(userId, effect, event.methodArn, authorizerContext);

        callback(null, policyDocument);
    } catch (error) {
        callback('Unauthorized');
    }
};