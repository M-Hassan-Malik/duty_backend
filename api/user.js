const router = require("express").Router();
const Controller = require("../controllers");

router.post(`/verify`, Controller.User.verify);
router.post(`/signup`, Controller.User.signup);
router.post(`/getDuty`, Controller.User.getUserDuty);
router.get(`/signin`, Controller.User.signin);

module.exports = router;