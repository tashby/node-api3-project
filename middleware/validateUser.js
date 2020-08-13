const db = require("../users/userDb")

function validateUserId() {
    return (req, res, next) => {
        db.getById(req.params.id)
		.then((user) => {
			if (user) {
                //attach the user data ti the req
                //so we can access it later
                req.user = user
				next()
			} else {
				res.status(404).json({
					message: "invalid user id"
				})
			}
		})
		.catch(next)
    }
}

function validateUser() {
    return (req, res, next) => {
        if(!req.params.id) {
            return res.status(400).json({
                message: "missing user data"
            })
        }
        
        db.getById(req.body.text)
		.then((post) => {
			if (post) {
                req.post = post
				next()
			} else {
				res.status(400).json({
					message: "missing required name field",
				})
			}
		})
		.catch(next)
    }
}

module.exports = {
    validateUserId,
    validateUser
}