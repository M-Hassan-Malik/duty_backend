const fsAdmin = require("firebase-admin");
const uuid = require("uuid");

exports.checkAPI = (req, res) => {
	console.log("API working");
	res.send("Server Is Working!");
};

exports.setDuty = async (req, res) => {
	try {
		const data = req.body;
		const date = new Date(data.date);
		data.date = fsAdmin.firestore.Timestamp.fromDate(new Date(date));
		data.createdOn = fsAdmin.firestore.FieldValue.serverTimestamp();

		const dataMap = {
			uid: data.uid,
			place: data.place,
			duty: data,
			comments: {},
			offers: {},
		};

		const db = fsAdmin.firestore();

		const result = await db
			.collection("duty")
			.doc(data.country)
			.collection(data.city)
			.doc("active_duties")
			.collection("task")
			.add(dataMap);

		res.status(200).json({ result: "done" });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e });
	}
};

exports.assignDuty = async (req, res) => {
	try {
		const data = req.body;
		data.assignedOn = fsAdmin.firestore.FieldValue.serverTimestamp();
		await fsAdmin
			.firestore()
			.collection("duty")
			.doc(data.country)
			.collection(data.city)
			.doc("active_duties")
			.collection("task")
			.doc(data.docId)
			.update({ status: data });

		res.status(200).json({ result: "done" });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e });
	}
};

exports.getDuties = async (req, res) => {
	try {
		const result = await fsAdmin
			.firestore()
			.collection("duty")
			.doc("Pakistan")
			.collection("Karachi City")
			.doc("active_duties")
			.collection("task")
			.get();

		var sendData = [];
		result.forEach((doc) => {
			sendData.push({
				docId: doc.id,
				docData: doc.data(),
			});
		});

		res.status(200).json({ result: sendData });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e });
	}
};

exports.addOffer = (req, res) => {
	try {
		const data = req.body;
		const result = fsAdmin
			.firestore()
			.collection("duty")
			.doc(data.country)
			.collection(data.city)
			.doc("active_duties")
			.collection("task")
			.doc(data.toDuty)
			.update({
				offers: fsAdmin.firestore.FieldValue.arrayUnion({
					offeredBy: data.byUser,
					userName: data.userName,
					offeredMoney: data.offer,
				}),
			});

		res.status(200).json({ result: "done" });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e });
	}
};

exports.addComment = (req, res) => {
	try {
		const data = {
			timestamp: Date.now(),
			parent: req.body.parent,
			userId: req.body.userId,
			comment: req.body.comment,
			replies: [],
		};
		req.body.parent === true
			? fsAdmin
					.firestore()
					.collection("duty")
					.doc("Pakistan")
					.collection("Karachi City")
					.doc("comments")
					.collection(req.body.dutyId) //Duty's Id
					.add(data) //sort by time
			: fsAdmin
					.firestore()
					.collection("duty")
					.doc("Pakistan")
					.collection("Karachi City")
					.doc("comments")
					.collection(req.body.dutyId)
					.doc(req.body.docId)
					.update({
						replies: fsAdmin.firestore.FieldValue.arrayUnion(data),
					});

		res.status(200).json({ result: "ok" });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e });
	}
};

exports.getComments = async (req, res) => {
	try {
		const result = await fsAdmin
			.firestore()
			.collection("duty")
			.doc("Pakistan")
			.collection("Karachi City")
			.doc("comments")
			.collection(req.params.parentDocId)
			.get();

		const comments = [];
		result.forEach((doc) => {
			var replies = doc.data().replies.sort((a, b) => {
				return a.timestamp - b.timestamp;
			});
			comments.push({
				docId: doc.id,
				docData: {
					timestamp: doc.data().timestamp,
					parent: doc.data().parent,
					userId: doc.data().userId,
					comment: doc.data().comment,
				},
				reply: replies,
			});
		});
		res.status(200).json({ result: comments });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e });
	}
};