import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';

function createToken(_id) {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

async function getUsers(req, res) {
    const users = await User.find();
    res.status(200).json(users);
}

async function createUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);

        res.status(201).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export { getUsers, createUser, loginUser };
