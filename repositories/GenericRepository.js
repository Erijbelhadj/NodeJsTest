var mongoose = require('mongoose');
var dbConfig = require('../config/config.js').db;

class GenericRepository{
    constructor(ModelClass){
        this.ModelClass = ModelClass;
        mongoose.connect(dbConfig.url);
        this.db = mongoose.connection;
    }

    all(){
        var self = this;
        return new Promise((resolve, reject) => {
            self.ModelClass.find({}, function(err, res){
                if (err) reject(err);
                return resolve(res);
            });
        });
    };

    find(id){
        var self = this;
        return new Promise((resolve, reject) => {
            self.ModelClass.findById(id, function(err, res){
                if (err) reject(err);
                return resolve(res);
            });
        });
    };

    store(user){
        var self = this;
        if(user._id)
            delete user._id;
        return new Promise((resolve, reject) => {
            self.ModelClass.create(user, function(err, res) {
                console.log('res', res);
                console.log('err', err);
                if (err) reject(err);
                return resolve(res);
                });
        });

        return user;
    };

    update(id, user){
        var self = this;
        if(user._id)
            delete user._id;

        return new Promise((resolve, reject) => {
            return this.find(id).then(result => {
                result.set(user);
                result.save((err, res) => {
                    if (err) reject(err);
   
                    return resolve(res);
                });
            }).catch( () => {
                return reject();
            });
            
        });
    }

    delete(id){
        var self = this;

        return new Promise((resolve, reject) => {
            return this.find(id).then(result => {
                result.remove((err, res) => {
                    if (err) reject(err);
   
                    return resolve(res);
                });
            }).catch( () => {
                return reject();
            });
            
        });
    }

    
}

module.exports = GenericRepository;