module.exports = {
    handle: (error) => {
        this.statusCode = 500;
        this.responseBody = {}
        if(error.name === 'ValidationError')
            {
                this.responseBody = {
                    message: error.message,
                    data: error
                };
                this.statusCode = 400;
            }
        
        return {statusCode: this.statusCode, responseBody: this.responseBody};
        
    }
}