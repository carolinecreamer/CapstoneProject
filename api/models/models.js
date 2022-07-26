const Parse = require('parse/node')


// Get current user
class User {
    static async getUser() {
        Parse.User.enableUnsafeCurrentUser()
        const currentUser = await Parse.User.current();
        return currentUser;
    }

    static async userQueryById(id) {
        const query = new Parse.Query(Parse.User);
        query.equalTo("id", id);  // find all the women
        const user = await query.find();
        await user.fetch();
        return user;
    }

    static async dereferencePointers(pointers) {
        let following = [];
        // Used for loop to iterate over the User pointers because the map() function is
        // not meant to run asynchronously and will not wait for one User to be appended to the end
        // of the "following" array before it moves on to the next User pointer
        for (const pointer of pointers) {
            const query = new Parse.Query(Parse.User);
            const user = await query.get(pointer["id"]);
            following.push(user.get("username"));
        }
        return following;
    }
}


module.exports = User;
