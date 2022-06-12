const { Users: User } = require('../models');
const { UserAuth } = require('../models');
const { UsersRoles } = require('../models');

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
        if (Array.isArray(roleGetResult) && roleGetResult.length > 0) {
            const authCreateResult = await AuthController.createUserAuth(auth);
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
                    message: "Username already exists",
                    code: 400
                }
            }
        } else {
            return {
                message: "Role doesn't exists",
                code: 400
            }
        }
        return {
            message: 'Something went wrong while trying to create the user',
            code: 500
        }
    },

    async getUsersById(userIdArray) {
        if (!Array.isArray(userIdArray)) return 'User ID must be an array';

        const queryResult = await User.findAll({
            where: {
                id: userIdArray
            },
            include: [
                {
                    model: UserAuth,
                    required: false,
                    attributes: ['id', 'username', 'password']
                },
                {
                    model: UsersRoles,
                    required: false,
                    attributes: ['id']
                },
            ],
            attributes: ['id', 'firstName', 'lastName', 'address', 'postcode', 'phoneNumber', 'email',]
        });
        return helper.parseSQLFindResult(queryResult);
        // return queryResult;
    },
    async getUserList() {
        const queryResult = await User.findAll({
            include: [
                {
                    model: UserAuth,
                    required: false,
                    attributes: ['username', 'password']
                }
            ],
            attributes: ['firstName', 'lastName', 'address', 'postcode', 'phoneNumber', 'email']
        });
        return queryResult;
    },
    async updateUser(userData, userId) {
        if (Object.keys(userData.auth).length > 0) {
            const authUpdateResult = await AuthController.updateUserAuth(userData.auth, userData.authId);
            console.log('authUpdateResult> ', authUpdateResult > 0);

            if (authUpdateResult > 0) {
                const userUpdateResult = await User.update(userData, {
                    where: {
                        id: userId
                    }
                });
                if (authUpdateResult > 0) {
                    return {
                        message: "User successfully updated",
                        code: 200
                    };
                } else {
                    return {
                        message: 'Unable to update user details',
                        code: 400
                    }
                }
            } else {
                return {
                    message: 'Unable to update user auth',
                    code: 400
                }
            }
        }

        return {
            message: 'Something went wrong while trying to create the user',
            code: 500
        }
    },


    //! WIP Add column for soft delete 
    //Soft delete
    async softDeleteUserById(userId) {

    },

    async removeUserById(userIdArray) {
        if (helper.isValidArray(userIdArray)) {
            const userGetResult = await this.getUsersById(userIdArray);

            if (!helper.isValidArray(userGetResult)) return { message: 'Something went wrong.', code: 400 }

            for (let i = 0; i < userGetResult.length; i++) {
                const obj = userGetResult[i];
                const authId = userGetResult[i].UserAuth.id;
                const userRoleId = userGetResult[i].UsersRole.id;

                // Delete User Details from DB
                await AuthController.deleteUserAuth(authId);
                await UsrRolesCtrller.removeUserRole(userRoleId);
                await User.destroy({
                    where: {
                        id: userIdArray
                    }
                });
            }

            return {
                message: `User${userGetResult.length > 1 ? 's' : ''} successfully deleted.`,
                code: 200
            };
        }

        return {
            message: 'Invalid params',
            code: 500
        }
    }

}
