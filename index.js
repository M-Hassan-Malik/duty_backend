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

// exec(
//   "lt --port 3000 --subdomain 'anythinkyouwantsir'",
//   (error, stdout, stderr) => {
//     if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//   }
// );

// fsAdmin
//   .firestore()
//   .collection("duty")
//   .doc("Pakistan")
//   .collection("Karachi City")
//   .onSnapshot((doc) => {
//       if (doc) {
//           console.log('ayaaaaaaNew', doc)
//       }
//     });


// fsAdmin
//   .firestore()
//   .collection("duty")
//   .doc("Pakistan")
//   .collection("Karachi City")
//   .doc("active_duties")
//   .collection("task")
//   .where("duty.done", "==", 0)
//   .onSnapshot((querySnapshot) => {
//     querySnapshot.docChanges().forEach((change) => {
//       if (change.type === "modified") {
//         console.log("Modified user's id: ", change.doc.data().uid);
//       }
//     });
//   });

//.doc("XS0h9n0VE4N4KNw6JsMR")
// .onSnapshot((doc) => {
//   if (doc) {
//       console.log('ayaaaaaaNew', doc.data())
//   }
// });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on localhost:3000`);
});
