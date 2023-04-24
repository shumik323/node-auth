const Router = require('express').Router;
const UserController = require('../controllers/user-controller');
const ROUTES = require('../constants/routes');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();


router.post(
    ROUTES.REGISTRATION,
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    UserController.registration,
);
router.post(ROUTES.LOGIN, UserController.login);
router.post(ROUTES.LOGOUT, UserController.logout);
router.get(ROUTES.ACTIVATE, UserController.activate);
router.get(ROUTES.REFRESH, UserController.refresh);
router.get(
    ROUTES.USERS,
    authMiddleware,
    UserController.getUsers
);

module.exports = router;
