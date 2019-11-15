module.exports = {
    getPosts: ( req, res ) => {
        const db = req.app.get('db');
        db.get_posts()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log({err});   
        })
    },
    addPost: ( req, res ) => {
        const db = req.app.get('db');
        const { title, img_url, content, user_id } = req.body;
    
        db.add_post([title, img_url, content, user_id])
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(500).send('oops.')
            console.log(err)
        })
    }, 
    getOne: (req, res) => {
        const db = req.app.get('db')
        db.one_post(req.params.id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send('oops.')
            console.log(err)
        })
    }
}