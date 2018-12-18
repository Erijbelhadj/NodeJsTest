var app = require('express')();
var bodyParser = require('body-parser')
var userController = require('./controllers/UserController.js');



app.use(bodyParser.json());

app.get("/api/users", userController.index);
app.get("/api/users/:id", userController.get);
app.post("/api/users", userController.store);
app.patch("/api/users/:id", userController.update);
app.delete("/api/users/:id", userController.delete);


app.use("*", function (request, response) {
    response.status(404).send(JSON.stringify({ message: 'Resource not found !' }));
});


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
    next(err);
});

app.listen(3030, () => {
    console.log(`Server started on port 3030`);
});