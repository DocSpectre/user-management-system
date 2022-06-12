const { Roles } = require('../models');
const helper = require('../helpers/helper');

module.exports.RolesController = {
    async createRole(roleData) {
        const roleExists = await this.getRole(null, roleData.roleName);
        if (Array.isArray(roleExists) && roleExists.length > 0) {
            return {
                message: `Role: ${roleData.roleName} already exists`
            };
        }

        const queryResult = await Roles.create({
            roles: roleData.roleName,
            isEnabled: 1 // Default 1 or true
        });
        return queryResult;
    },


    async getRole(roleId = null, roleName = null) {
        console.log({ roleId, roleName });
        if (roleId != null && roleName != null) return await this.getRoleByNameId(roleId, roleName);
        if (roleId != null) return await this.getRoleById(roleId);
        if (roleName != null) return await this.getRoleByName(roleName);
        return {
            message: 'Something went wrong!'
        };
    },

    async getRoleByName(role) {
        const queryResult = await Roles.findAll({
            where: {
                roles: role,
                isEnabled: 1
            },
            attributes: ['id', 'roles', 'isEnabled']
        });

        return helper.parseSQLFindResult(queryResult);
    },

    async getRoleById(id) {
        const queryResult = await Roles.findAll({
            where: { id }
        });
        return queryResult;
    },

    // Get Role by Name and Id
    async getRoleByNameId(roleId, roleName) {
        const queryResult = await Roles.findAll({
            where: {
                id: roleId,
                roles: roleName
            }
        });
        return queryResult;
    },

    async updateRole(roleId, roleData) {
        const queryResult = await Roles.update(roleData, {
            where: {
                id: roleId
            }
        });
        return queryResult;
    },

    async getRoleList() {
        const queryResult = await Roles.findAll();
        return queryResult;
    },


}