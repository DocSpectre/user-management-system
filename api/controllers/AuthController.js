const { UserAuth } = require('../models');
const helper = require('../helpers/helper');

module.exports.AuthController = {

    async createUserAuth(authData) {
        const usernameExists = await this.checkIsExisting(authData.username);
        if (usernameExists) return null;

        const queryResult = await UserAuth.create(authData);
        return queryResult;
    },

    async getUserAuthById() {

    },
    async getUserAuthList() {

    },
    async updateUserAuth() {

    },

    // Check if username exists
    async checkIsExisting(username) {
        const queryResult = await UserAuth.findAll({
            where: {
                username
            }
        });

        const parsedQuery = helper.parseSQLFindResult(queryResult);
        if (Array.isArray(parsedQuery) && parsedQuery.length > 0) {
            return true;

        } else if (Array.isArray(parsedQuery) && parsedQuery.length == 0) {
            return false;
        }
        return true;
    }
}