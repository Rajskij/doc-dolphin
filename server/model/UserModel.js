import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';
import LoginError from '../Error/LoginError.js';

const schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

schema.statics.signup = async function (fullName, email, password) {
    if (!fullName || !email || !password) {
        throw Error('All fields must be filled');
    }
    // ⚠️⚠️⚠️ WARNING: Arrow functions don't bind 'this'! ⚠️⚠️⚠️
    // Using 'this' here will cause "Cannot read properties of undefined"
    // 'this' doesn't refer to the model instance
    const user = await this.findOne({ email });

    if (user) {
        throw Error('User already exists');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }

    const saltRounds = 10;
    const encryptedPass = await bcrypt.hash(password, saltRounds);
    const result = await this.create({
        fullName,
        email,
        password: encryptedPass
    });

    return result;
}

schema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new LoginError('Wrong email or password', 401);
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
        throw new LoginError('Email or password doesn\'t exists', 401);
    }
    
    return user;
}

export default mongoose.model('user', schema);
