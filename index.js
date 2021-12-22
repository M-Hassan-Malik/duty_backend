const express = require("express");
const app = express();
const fsAdmin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const localtunnel = require("localtunnel");
var cors = require("cors");
require("dotenv").config();


app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

fsAdmin.initializeApp({
	credential: fsAdmin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./api/user"));
app.use("/duty", require("./api/duty"));
app.use("/duty_history", require("./api/duty_history"));

// const tunnel = localtunnel(3000, { subdomain: "bilkulnaya" }, (err, tunnel) =>
// 	err ? console.log({ err }) : console.log('listening on tunnel',tunnel)
// );

// tunnel.on("close", function () {
// 	console.log("Tunnel closed");
// });

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on localhost:300 & `);
});
