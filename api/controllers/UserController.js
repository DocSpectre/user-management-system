const User = require('../models').Users;

module.exports.UserController = {

    async createUser(userData, role) {
        // Create a new user
        const result = await User.create({ firstName: "Jane", lastName: "Doe" });
        console.log('result: ', result);
    },

    async getUserById() {

    },
    async getUserList() {

    },
    async updateUser() {

    },

    //Soft delete
    async deleteUserById() {

    }

}
