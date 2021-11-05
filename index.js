const express = require("express");
const app = express();
const fsAdmin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const localtunnel = require("localtunnel");
const { firestore } = require("firebase-admin");
const { merge } = require("./api/user");

fsAdmin.initializeApp({
	credential: fsAdmin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./api/user"));
app.use("/duty", require("./api/duty"));
app.use("/duty_history", require("./api/duty_history"));

const tunnel = localtunnel(3000, { subdomain: "hello" }, (err, tunnel) =>
	err ? console.log({ err }) : console.log('listening on tunnel')
);

tunnel.on("close", function () {
	console.log("Tunnel closed");
});


app.listen(3000, console.log("listening on port 3000"));
