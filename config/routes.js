module.exports = app => {
    
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.auth.register)
        
    app.route('/transactions')
        .post(app.api.transaction.save)
        .get(app.api.transaction.get)

    app.route('/transactions/:accountId')
        .post(app.api.transaction.save)
        .get(app.api.transaction.getById)    

    app.route('/accounts')
        .post(app.api.account.save)
        .get(app.api.account.get)
    
    app.route('/accounts/:id')
        .get(app.api.account.getById)
        .patch(app.api.account.patch)

    
        
}