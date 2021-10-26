const router = require("express").Router();
const Controller = require("../controllers");

router.get(`/asasas`, Controller.User.setDuty);

module.exports = router;