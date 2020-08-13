const db = require("../posts/postDb")

function validatePost() {

    return (req, res, next) => {
        if(!req.params.id) {
            return res.status(400).json({
                message: "missing post data"
            })
        }
        
        db.getById(req.body.text)
		.then((post) => {
			if (post) {
                //attach the post data to the req
                //so we can access it later
                req.post = post
				next()
			} else {
				res.status(400).json({
					message: "missing required text field",
				})
			}
		})
		.catch(next)
    }
}

module.exports = {
    validatePost
}