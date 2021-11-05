const router = require("express").Router();
const Controller = require("../controllers");

router.post(`/setDuty`, Controller.Duty.setDuty);
router.get(`/getDuty`, Controller.Duty.getDuties);
router.post('addComment', Controller.Duty.addComment);

module.exports = router;