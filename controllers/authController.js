const { generateAccessToken } = require('../helpers/jwtHelper');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const saveUser = await newUser.save();
        res.json(saveUser);

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch user from database
        const user = await User.findOne({ email });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const accessToken = await generateAccessToken(user.id, user.name);

                res.cookie("adminToken", accessToken).json({ 
                    message: "Success",
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    },
                    token: accessToken 
                });
            } else {
                res.status(400).json("The password is incorrect");
            }
        } else {
            res.status(400).json("No record existed");
        }

    } catch (error) {
        console.error('Error login user:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {
    registerUser,
    login
}
