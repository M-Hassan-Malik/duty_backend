const express = require("express");
const app = express();
var fsAdmin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

fsAdmin.initializeApp({
	credential: fsAdmin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use("/user",require('./api/user'));
app.use("/duty",require('./api/duty'));
app.use("/duty_history",require('./api/duty_history'));

// const db = fsAdmin.firestore();
// db.collection("duty")
// 	.doc("check")
// 	.set({
// 		first: "Hassan",
// 		last: "Soahil",
// 		address: "133 5th St., San Francisco, CA",
// 		birthday: "05/13/1990",
// 		age: "30",
// 		timestamp: fsAdmin.firestore.FieldValue.serverTimestamp(),
// 	})
// 	.then((res) => {
// 		console.log({ res });
// 	});

app.listen(5000, console.log("listening on port 4000"));
