const express = require("express");
const bcryptjs = require("bcryptjs");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const JWT_SECRET_KEY = "your-secret-key"; // Replace with a secure secret key

userRouter.post("/signup", async (req, res) => {
	try {
		const { firstName, lastName, email, password, confirmPassword, username } =
			req.body;
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!username ||
			!confirmPassword
		) {
			return res.status(400).json({ msg: "Please fill in all fields." });
		}

		// Password validation
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
		const hasUppercase = /[A-Z]/.test(password);
		const isLengthValid = password.length >= 8;

		if (!hasSpecialChar || !hasUppercase || !isLengthValid) {
			return res.status(400).json({
				msg: "Password must contain a special character, an uppercase letter, and be at least 8 characters long.",
			});
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ msg: "Passwords do not match." });
		}

		// Email Validation
		if (!validateEmail(email)) throw new Error("Please enter valid email.");
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ msg: "email already taken." });
		}

		const hashedPassword = await bcryptjs.hash(password, 8);
		const newUser = new User({
			firstName,
			lastName,
			username,
			email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		console.log(savedUser.username);
		res.json(savedUser);
	} catch (error) {
		res.status(500).json({ msg: error.message });
		// User Friendly Message -> res.status(500).json({ msg: "Internal Server Error. Please try again later." });
	}
});

userRouter.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ msg: "Please fill in all fields" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ msg: "User with this email does not exist" });
		}

		const isMatch = await bcryptjs.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).send({ msg: "Incorrect password" });
		}
		const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY);
		res.json({ token, user: { id: user._id, username: user.username } });
	} catch (error) {
		res.status(500).json({ msg: error.message });
		// User Friendly Message -> res.status(500).json({ msg: "Internal Server Error. Please try again later." });
	}
});

userRouter.post("/tokenIsValid", async (req, res) => {
	try {
		const token = req.header("x-auth-token");
		if (!token) return res.json(false);
		const verified = jwt.verify(token, JWT_SECRET_KEY);
		if (!verified) return res.json(false);
		const user = await User.findById(verified.id);
		if (!user) return res.json(false);
		return res.json(true);
	} catch (error) {
		res.status(500).json({ msg: error.message });
		// User Friendly Message -> res.status(500).json({ msg: "Internal Server Error. Please try again later." });
	}
});

userRouter.get("/", auth, async (req, res) => {
	const user = await User.findById(req.user);
	res.json({
		username: user.username,
		id: user._id,
	});
});

module.exports = userRouter;

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
