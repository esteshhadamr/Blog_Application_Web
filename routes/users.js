const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController')

// Create User
router.post('/', controller.create);

//Get users list
router.get('/', controller.list);


//Show User
router.get('/:id', controller.show);

//Update User
router.put('/:id', controller.update);


// Delete User
router.delete('/:id', controller.delete);

module.exports = router;
