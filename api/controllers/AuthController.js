const { UserAuth } = require('../models');
const { Users: User } = require('../models');

const helper = require('../helpers/helper');
const { UsersRolesController: usrRoleCtrller } = require('./UsersRoles');
const dataVerify = require('../helpers/data_verify');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.AuthController = {

    async createUserAuth(authData) {
        const usernameExists = await this.checkIsExisting(authData.username);
        if (usernameExists) return null;

        const queryResult = await UserAuth.create(authData);
        return queryResult;
    },

    async getUserAuthById(userAuthId) {
        const queryResult = await UserAuth.findAll({
            where: {
                id: userAuthId
            }
        });
        return helper.parseSQLFindResult(queryResult);
    },
    async getUserAuthList() {
        const queryResult = await UserAuth.findAll();
        return helper.parseSQLFindResult(queryResult);
    },

    async deleteUserAuth(authId) {
        return await UserAuth.destroy({
            where: {
                id: authId
            }
        });
    },

    async updateUserAuth(authData, id) {
        const queryResult = await UserAuth.update(authData, {
            where: {
                id
            }
        });
        return queryResult;
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
    },

    async loginAuth(authBody) {
        if (dataVerify.validateDataType(authBody.username)) {
            const authResult = await this.verifyAuth(authBody);
            if (helper.isValidArray(authResult)) {
                const [authObj] = authResult;
                return this.signToken(authObj);
            }
        }
        return {
            message: "Invalid login."
        };
    },

    async verifyAuth(authBody) {
        const queryResult = await UserAuth.findAll({
            where: {
                username: authBody.username,
                password: authBody.password
            }, include: [
                {
                    model: User,
                    required: false,
                    attributes: ['id']
                }
            ],
            attributes: ['id']
        });
        const [parsedObj] = helper.parseSQLFindResult(queryResult);
        if (parsedObj) {
            const usrRoleData = usrRoleCtrller.getUserRole(parsedObj.User.id);
            return usrRoleData;
        }
        return null;
    },

    async signToken({ userId, roleId }) {
        return jwt.sign({ userId, roleId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION_TIME
        })
    },

    async verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return 'Unauthorized';

            return decoded;
        });
    }
}