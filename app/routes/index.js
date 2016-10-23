module.exports = (app) => {

    app.route('*')
        .get((req, res) => {
            res.sendFile(process.cwd() + '/index.html')
        })
}
