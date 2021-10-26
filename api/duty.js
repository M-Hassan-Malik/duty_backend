const router = require("express").Router();
const Controller = require("../controllers");

router.post(`/setDuty`, Controller.Duty.setDuty);
router.get(`/setDuty`, Controller.Duty.getDuties);

module.exports = router;