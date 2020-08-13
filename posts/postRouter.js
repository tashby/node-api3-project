const express = require('express');
const db = require('./postDb')
const router = express.Router();
const {validatePost} = require("../middleware/validatePost")

router.get('/', (req, res) => {
  // do your magic!
  res.json({
		message: "Welcome to my API",
	})
});

// GET
router.get("/posts", (req, res) => {
  db.get()
  .then((posts) =>{
      res.json(posts)
  })
  .catch(() => {
      res.status(500).json({
          error: "The posts information could not be retrieved."
      })
  })
})

// GET by id
router.get('/posts/:id', (req, res) => {
  // do your magic!
  db.getById(req.params.id)
    .then((post) => {
        if (!post) {
            return res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
        res.json(post)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })

});

// POSTS
router.post("/posts", validatePost(), (req, res) => {

  db.insert(req.body)
  .then((post) => {
      res.status(201).json(post)
  })
  .catch(next)
})

// DELETE
router.delete('/posts/:id', (req, res) => {
  // do your magic!
  db.remove(req.params.id)
        .then((count) => {
            if(count > 0) {
                res.status(200).json({
                    message: "Welcome to oblivion"
                })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
});

// PUT
router.put('/posts/:id', (req, res) => {
  // do your magic!
  if(!req.body.text) {
    return res.status(400).json({
        errorMessage: "Please provide text for the post."
    })
}

db.getById(req.params.id)
.then((post) => {
    console.log(post)
    if (!post) {
        return res.status(404).json({
             message: "The post with the specified ID does not exist."
            })
        }
})
db.update(req.params.id, req.body)
.then((comm) => {
         res.status(200).json(comm)
})
.catch((error) => {
    console.log(error)
    res.status(500).json({
        error: "The post information could not be modified."
    })
})
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
