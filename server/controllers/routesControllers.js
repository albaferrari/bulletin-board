const pool = require ("../database/configurations");

module.exports = {
    
    getHome: (req, res) => {
        res.render ("index");
        },

    addMessage: (req, res) => {
        console.log(req.body)
        pool.connect().then( client => {
            return client.query("insert into messages(title, body) values($1,$2)",
             [req.body.newTitle,
             req.body.newBody,
             ]
            ).then(results => {
                console.log(`Successfully inserted new message to DB: ${results.rowCount}`)
                res.redirect("/messages");
            }).catch(error => {
                console.error(`Couldn't add new message: ${error.stack}`)
            });
        })
        .catch(error => {
            console.error(`Couldn't connect to DB: ${error.stack}`)
        })
    },

    getMessages: (req, res) => {
        pool.connect()
        return pool.query("select * from messages")
        .then(results => {
            res.render("messages", { displayMessages: results.rows })
        })
        .catch(error => {
            console.error(
                `Could not find messages in database: ${error.stack}`
            )
        })
    }

}