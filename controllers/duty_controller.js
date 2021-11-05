const fsAdmin = require("firebase-admin");

exports.setDuty = async (req, res) => {
	try {
		const data = req.body;
		const date = Date(data.date);
		data.date = fsAdmin.firestore.Timestamp.fromDate(new Date(date));
		data.createdOn = fsAdmin.firestore.FieldValue.serverTimestamp();

		const db = fsAdmin.firestore();

		const result = await db
			.collection("duty")
			.doc(data.country)
			.collection(data.city)
			.doc("active_duties")
			.collection(data.uid)
			.doc("tasks")
			.collection("my_task")
			.doc()
			.set(data);

		res.status(200).json({ result: "done" });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e });
	}
};

exports.getDuties = (req, res) => {
	try {
		const result = fsAdmin
			.firestore()
			.collection("duty")
			.doc("Pakistan")
			.collection("Karachi City")
			.doc("active_duties")
			.collection("fFLzPABNDAT0v2KZrif6ot1ObPy2")
			.doc("tasks")
			.collection("my_task")
			.get();

		var sendData = [];
		result.forEach((doc) => sendData.push(doc.data()));
		res.status(200).json({ result: sendData });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e });
	}
};

exports.addComment = (req, res) => {
	try {
		const result = fsAdmin
			.firestore()
			.collection("duty")
			.doc(
				"/Pakistan/Karachi City/active_duties/fFLzPABNDAT0v2KZrif6ot1ObPy2/tasks/my_task/geNY5jrRKh78E0FSeQGk"
			)
			.update("Cosmments", firestore.FieldValue.arrayUnion("sdsd"), {
				merge: true,
			});
		res.status(200).json({ result: result });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e });
	}
};
