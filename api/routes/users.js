const router = require("express").Router();
const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res)=>{
  const users = await User.find()
  res.json(users)
})

router.get("/:id", async (req, res)=>{
  const users = await User.find({_id: req.params.id})
  res.json(users)
})

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.put("/:id", async (req, res) => {
	try {
	  const updatedUser = await User.findByIdAndUpdate(
		{_id: req.params.id},
		{
		  $set: req.body,
		},
		{ new: true }
	  );
	  res.json(updatedUser);
	} catch (err) {
	  res.json(err);
	}
  });

module.exports = router;
