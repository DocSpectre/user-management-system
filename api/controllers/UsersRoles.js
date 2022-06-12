const { UsersRoles } = require('../models')

module.exports.UsersRolesController = {

    async assignUserRole(roleId, userId) {
        const queryResult = await UsersRoles.create({
            roleId,
            userId
        });
        return queryResult;
    },

    async removeUserRole(userRoleId) {
        const queryResult = await UsersRoles.destroy({
            where: {
                id: userRoleId
            }
        });
        return queryResult;
    },

    async getUserRole(userId) {
        const queryResult = await UserAuth.findAll({
            where: {
                userId
            }
        });
        return queryResult;
    },
};