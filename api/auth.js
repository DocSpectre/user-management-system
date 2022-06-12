const { AuthController } = require('./controllers/AuthController');

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
    const token = event.authorizationToken;


    console.log('token.', token);

    const decoded = await AuthController.verifyToken(token);
    console.log('decoded> ', decoded);
    // const isAllowed = authorizeUser(user.scopes, event.methodArn);
    const effect = 'Allow';
    const userId = decoded.userId;


    const policyDocument = utils.buildIAMPolicy(userId, effect, event.methodArn, authorizerContext);

    callback(null, policyDocument);
};