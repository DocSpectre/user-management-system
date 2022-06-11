const { AdminModel } = require('./AdminController');
const { UserController } = require('./UserController');

module.exports.UsersModel = {
    async createUser(userData, role) {
        let result = null;
        switch (role) {
            case 'Admin':
                result = await AdminModel.createAdmin();
                break;
            case 'User':
                result = await UserController.createUser();
                break;
            default:
                break;
        }

        return result;
    }
};