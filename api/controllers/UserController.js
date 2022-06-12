const { Users: User } = require('../models');
const { RolesController } = require('./RolesController');
const { AuthController } = require('./AuthController');
const { UsersRolesController: UsrRolesCtrller } = require('./UsersRoles');
const helper = require('../helpers/helper');

module.exports.UserController = {

    /** 
     *  
     * Requirements: username doesn't exists and userrole must be existing in db
     * 
     * 1.) Check and get User Role
     * 2.) Check if username exists
     * 3.) Create User, Auth and assign a role
     * */
    async createUser(userData, role) {
        const { auth } = userData;

        const roleGetResult = await RolesController.getRoleByName(role);
        const authCreateResult = await AuthController.createUserAuth(auth);

        if (Array.isArray(roleGetResult) && roleGetResult.length > 0) {
            if (authCreateResult && authCreateResult.id) {
                const [{ id: roleId }] = roleGetResult;

                const createResult = await User.create({
                    ...userData,
                    authId: authCreateResult.id
                });

                if (parseInt(createResult.id)) {
                    UsrRolesCtrller.assignUserRole(roleId, createResult.id);
                    return createResult;
                }
            } else {
                return {
                    message: "Username already exists"
                }
            }
        } else {
            return {
                message: "Role doesn't exists"
            }
        }
        return {
            message: 'Something went wrong while trying to create the user'
        }
    },

    async getUserById(userId) {
        const queryResult = await User.findAll({
            where: {
                id: userId
            }
        });
        return queryResult;
    },
    async getUserList() {
        const queryResult = await User.findAll();
        return queryResult;
    },
    async updateUser(userData, userId) {
        await User.update({ userData }, {
            where: {
                id: userId
            }
        });
    },


    //! WIP Add column for soft delete 
    //Soft delete
    async softDeleteUserById(userId) {

    },

    async removeUserById(userId) {
        await User.destroy({
            where: {
                id: userId
            }
        });
    }

}
