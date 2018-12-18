var userRepository = require('../repositories/UserRepository');
var errorHandler = require('../utils/ErrorHandler');

var UserController = {
    index: (request, response) => {
        userRepository.all().then( res => {
            console.log('res:', res);
            let users = res;
            responseBody = {
                message: '',
                data: [users]
            };

        return response.json(responseBody);
        });
        
    },

    get: (request, response) => {
        userRepository.find(request.params.id).then(res => {
            if(!res){
                responseBody = {
                    message: 'User Not Found',
                    data: null
                };
                return response.status(404).json(responseBody);
            } 

            let user = res;
            console.log("user:", user);
            responseBody = {
                message: '',
                data: user
            };

            return response.json(responseBody);
        }).catch(err => {
            responseBody = {
                message: 'User Not Found',
                data: null
            };
            response.status(404).send(responseBody);
        });;
    },

    store: (request, response) => {
        req_data = request.body;
        userRepository.store(req_data).then(user => {
            responseBody = {
                message: 'User Created Successfully',
                data: user
            };
    
            return response.status(201).json(responseBody); 
        }).catch(err => {
            var data = errorHandler.handle(err);
            return response.status(data.statusCode).json(data.responseBody);
        });
    },

    update: (request, response) => {
        req_data = request.body;

        userRepository.update(request.params.id, req_data).then( (res) => {
            responseBody = {
                message: 'User updated Successfully',
                data: res
            };
    
            return response.json(responseBody); 
        }).catch(err => {
            responseBody = {
                message: 'User Not Found',
                data: null
            };
            response.status(404).send(responseBody);   
        });
    },

    delete: (request, response) => {
        userRepository.delete(request.params.id).then( () => {
            responseBody = {
                message: 'User Deleted Successfully',
                data: null
            }
    
            response.json(responseBody);
        }).catch( () => {
            responseBody = {
                message: 'User Not Found',
                data: null
            }
            return response.status(404).json(responseBody);
        });
        
    }
};

module.exports = UserController;