const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/authMiddleware');



router.post('/signup', userController.handleSignup);
router.post('/signin', userController.handleSignIn);

router.get('/', isAuthenticated , userController.getUser);
router.delete('/', isAuthenticated , userController.handleDeleteUser);


module.exports = router;