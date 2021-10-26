const router = require("express").Router();
const Controller = require("../controllers");

router.get(`/blalaaa`, Controller.Duty_History.setDuty);

module.exports = router;
 