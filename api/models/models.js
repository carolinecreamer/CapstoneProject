const Parse = require('parse/node')


// Get current user
class User {
    static async getUser() {
        Parse.User.enableUnsafeCurrentUser()
        const currentUser = await Parse.User.current();
        return currentUser;
    }
}


module.exports = Cities;
