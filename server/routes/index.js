const Users = require('../controllers/user');

module.exports = app => {
    app.post('/api/users', Users.signUp);
    app.get('/api/users', Users.getUsers);
}