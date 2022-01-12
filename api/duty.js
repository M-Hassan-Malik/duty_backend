const router = require("express").Router();
const Controller = require("../controllers");

router.get(`/check`, Controller.Duty.checkAPI);
router.post(`/setDuty`, Controller.Duty.setDuty);
router.post(`/assignDuty`, Controller.Duty.assignDuty);
router.post('/addComment', Controller.Duty.addComment);
router.post('/addOffer', Controller.Duty.addOffer);
router.post('/getOffers', Controller.Duty.getOffers);
router.post(`/getDuty`, Controller.Duty.getDuties);

router.get(`/getComments/:parentDocId`, Controller.Duty.getComments);

module.exports = router;
