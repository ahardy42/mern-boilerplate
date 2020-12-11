const db = require('../database/schemas');

const { User } = db;

class UserController {
    
    static create = async (user, options = {}) => {
        const newUser = new User(user);
        try {
            const userDoc = await newUser.save({...options, new: true});
            return userDoc;
        } catch (error) {
            console.error('UserController.create error:', error);
            return false;
        }
    }

    static show = async (userId = null, options = {}) => {
        if (userId !== null) {
            try {
                const user = await User.findById(userId);
                return user;
            } catch (error) {
                console.error('UserController.show(id) error:', error);
                return false;
            }
        } else {
            try {
                const users = await User.find(options);
                return users;
            } catch (error) {
                console.error('UserController.show() error:', error);
                return false;
            }
        }
    }

    static update = async (userId, update = {}, options = {}) => {
        try {
            const updatedUser = User.findByIdAndUpdate(userId, update, {...options, new: true}).exec();
            return updatedUser;
        } catch (error) {
            console.error('UserController.update error:', error);
            return false;
        }
    }

    static delete = userId => {
        try {
            const deletedUser = User.findByIdAndDelete(userId).exec();
            return deletedUser;
        } catch (error) {
            console.error('UserController.delete error:', error);
            return false;
        }
    }

}

module.exports = UserController;