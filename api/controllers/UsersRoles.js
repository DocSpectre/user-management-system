const { UsersRoles } = require('../models')

module.exports.UsersRolesController = {

    async assignUserRole(roleId, userId) {
        const queryResult = await UsersRoles.create({
            roleId,
            userId
        });
        console.log('result: ', queryResult);
        return queryResult;
    },

    async demoteUserRole(userRoleId) {
        const queryResult = await UsersRoles.destroy({
            where: {
                id: userRoleId
            }
        });
        console.log('result: ', queryResult);
        return queryResult;
    },
};