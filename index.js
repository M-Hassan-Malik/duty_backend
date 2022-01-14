const { exec } = require("child_process");
const express = require("express");
const app = express();
const fsAdmin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
require("dotenv").config();
var cors = require("cors");

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


// exec("lt --port 3000 --subdomain 'woapi'", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on localhost:3000`);
});