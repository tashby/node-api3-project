const express = require('express');
const db = require('./userDb')
const router = express.Router();
const {validateUserId, validateUser} = require("../middleware/validateUser")

// router.post('/', (req, res) => {
//   // do your magic!
// });

router.post('/users', (req, res) => {
  // do your magic!
  if(!req.body.name) {
    return res.status(400).json({
        errorMessage: "Please provide name for the post."
    })
}

db.insert(req.body)
.then((user) => {
    res.status(201).json(user)
})
.catch((error) => {
    console.log(error)
    res.status(500).json({
        error: "There was an error while saving the post to the database"
    })
})
});

router.get('/users', (req, res) => {
  // do your magic!
  db.get()
  .then((users) =>{
      res.json(users)
  })
  .catch(() => {
      res.status(500).json({
          error: "The users information could not be retrieved."
      })
  })
});

router.get('/users/:id', validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

// router.get('/:id/posts', (req, res) => {
//   // do your magic!
// });

router.delete('/users/:id', validateUserId(), (req, res) => {
  // do your magic!
  db.remove(req.params.id)
        .then((count) => {
            if(count > 0) {
                res.status(200).json({
                    message: "Welcome"
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

router.put('/users/:id', validateUserId(), (req, res) => {
  // do your magic!
  if(!req.body.name) {
    return res.status(400).json({
        errorMessage: "Please provide text for the post."
    })
}

db.update(req.params.id, req.body)
.then((user) => {
         res.status(200).json(user)
})
.catch((error) => {
    console.log(error)
    res.status(500).json({
        error: "The post information could not be modified."
    })
})
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
