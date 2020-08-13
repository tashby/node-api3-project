// code away!
const express = require("express")
const postRouter = require("./posts/postRouter")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")


const server = express()
const port = 4000

server.use(express.json())
server.use(postRouter)
server.use(userRouter)
server.use(logger())

server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "missing required text field"
	})
})


server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})