const fsAdmin = require("firebase-admin");

exports.verify = (req, res) => {
	const nodemailer = require("nodemailer");
	const OTP = Math.floor(Math.random() * 90000) + 10000;
	let emailTo = req.body.email.replace(/\s/g, "");
	const transporter = nodemailer.createTransport({
		service: "outlook",
		auth: {
			user: "auth_duty@outlook.com",
			pass: "sonaMuskaan420!",
		},
	});
	const options = {
		from: "auth_duty@outlook.com",
		to: emailTo,
		subject: "OTP - Verification",
		html: `Dear Customer, Your OTP for "Duty App" is <i style="color:blue; font-size: 150%;">${OTP}</i>. Use this Passcode to complete your account verification.<br/>Thank you.`,
	};

	transporter.sendMail(options, (err, result) => {
		if (err) {
			res.status(400).json({ error: `an error has occured: ${err}` });
			return;
		} else {
			res.status(200).json({
				result: {
					msg: `An verification OTP-code is sent to your email check/verify it please.`,
					otp: OTP,
				},
			});
		}
	});
};

exports.signup = async (req, res) => {
	try {
	const data = req.body;
	const location = JSON.parse(data.address);
	console.log(data);
		const user = await fsAdmin.auth().createUser({
			email: data.email.replace(/\s/g, ""),
			emailVerified: true,
			password: data.password,
			displayName: data.name + " " + data.last_name,
			photoURL: "http://www.example.com/12345678/photo.png",
			disabled: false,
			customClaims: { roleId: 1 },
		});
		await fsAdmin
			.firestore()
			.collection("duty")
			.doc(location.country)
			.collection(location.city)
			.doc("users")
			.collection(user.uid)
			.doc("information")
			.set({
				first: data.name,
				last: data.last_name,
				address: location.address,
				birthday: Date("30/07/1997"),
				age: 24,
				timestamp: fsAdmin.firestore.FieldValue.serverTimestamp(),
			});
		res
			.status(200)
			.json({ result: { message: "Sucessfully Registered", user: user } });
	} catch (e) {
		console.log(e);
		res.status(400).json({ error: e });
	}
};

exports.signin = (req, res) => {
	console.log("checking go!");
	res.send("API wordking");
};
