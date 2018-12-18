var mongoose = require('mongoose');
var UserModel = require('../models/UserModel');
var GenericRepository = require('./GenericRepository');

class UserRepository extends GenericRepository{
    constructor(){
        super(UserModel);
    }
}
module.exports = new UserRepository();