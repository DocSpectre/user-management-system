const { AdminModel } = require('./AdminController');
const { UserController } = require('./UserController');


/**
 * Controller for all Users
 */
module.exports.UsersModel = {
    async createUser(userData, role) {
        let result = null;
        switch (role) {
            case 'Admin':
                result = await AdminModel.createAdmin(userData);
                break;
            case 'User':
                result = await UserController.createUser(userData, roleId);
                break;
            default:
                break;
        }

        return result;
    }
};

